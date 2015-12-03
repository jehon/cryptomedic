<?php

require_once("RouteReferenceTestCase.php");

class SyncTest extends RouteReferenceTestCase {
  protected $cp = "";
  protected $offline = null;
  static protected $initialCP = "";

  protected function showURL() {
    echo "\n";
    echo "http://localhost/cryptomedic/rest/public/sync?cp=" . $this->cp;
    echo "\n";
  }

  public function _isFinal() {
    $this->assertObjectHasAttribute('isfinal', $this->offline);
    $this->assertEquals(1, $this->offline->isfinal);
  }

  public function _hasPatient($id, $msg = null) {
    $msg = $msg || "has patient $id";
    foreach($this->offline->data as $i => $item) {
      if (property_exists($item, 'record') && ($item->record->id == $id)) {
        return true;
      }
    }
    return false;
  }

  public function _hasDeleted($id, $msg = null) {
    $msg = $msg || "deletes patient $id";
    foreach($this->offline->data as $i => $item) {
      if (property_exists(($item), "_deleted") && ($item->id == $id)) {
        return true;
      }
    }
    return false;
  }

  public function getNext($n = 1) {
    $this->setUrl("sync", [ "cp" => $this->cp, "n" => $n ]);
    $json = $this->myAssertJSON("readonly");

    $this->assertObjectHasAttribute('_offline', $json);
    $offline = $json->_offline;

    if (!property_exists($offline, "isfinal") || !$offline->isfinal) {
      $this->assertObjectHasAttribute('data', $offline);
    }
    // $this->assertObjectHasAttribute('checkpoint', $offline);
    if (!$this->cp) {
      $this->assertObjectHasAttribute('reset', $offline);
      $this->assertEquals(1, $offline->reset);
    }
    if (count($offline->data) > 0) {
      $newCP = end($offline->data)->checkpoint;
      if ($newCP) {
        $this->cp = $newCP;
      }
    }
    // $this->cp = $offline->checkpoint;
    $this->offline = $offline;
    return $offline;
  }

  public function setUp($url = null, $params = array()) {
    parent::setUp("sync");
  }

  public function testsUnauthenticated() {
    $this->setUrl("sync", [ "cp" => "" ]);
    $this->myAssertUnauthorized();
  }

  public function testFlow() {
    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(7));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(3));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(4));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(1));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(6));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(5));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasDeleted(9));

    $offline = $this->getNext(1);
    $this->assertTrue($this->_hasPatient(2));

    // $this->_isFinal();

    self::$initialCP = $this->cp;
  }

  public function _createSyncAndDelete($cnt) {
    // Change patient
    $res = DB::statement("UPDATE patients SET updated_at = NOW() WHERE id = 1 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(10);
    $this->assertTrue($this->_hasPatient(1), "Update patient #" . $cnt);

    // Change file
    $res = DB::statement("UPDATE bills SET updated_at = NOW() WHERE patient_id = 3 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(10);
    $this->assertTrue($this->_hasPatient(3), "Update bill #" . $cnt);

    // Simulating deleting a sub file for a patient
    $res = DB::statement("INSERT INTO deleteds(created_at, patient_id, entity_type, entity_id) VALUES (NOW(), '1010', 'bills', '10'); ");
    $this->assertTrue($res);
    $offline = self::getNext(10);
    $this->assertTrue($this->_hasDeleted(1010), "Delete one #" . $cnt);
  }

  public function testChangesInDatabase() {
    $this->cp = self::$initialCP;

    // The sync is final before starting
    $offline = self::getNext(10);
    // $this->_isFinal();
    $this->_createSyncAndDelete("-");
  }

  public function testALotOfTimes() {
    for($i = 0; $i < 100; $i++)
      $this->_createSyncAndDelete($i);
  }
}
