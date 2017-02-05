<?php

require_once("RouteReferenceTestCase.php");
require_once("SyncableTestCase.php");

class SyncTest extends SyncableTestCase {
  protected $cp = "";
  protected $offline = null;
  static protected $initialCP = "";

  public function testsUnauthenticated() {
    $this->syncReset();
    $json = $this->myRunAssertQuery(
      $this->getNewRequestOptionsBuilder()
        ->setUrl("sync")
        ->asUnauthenticated()
        ->setExpected(401)
        ->asText()
      );
    $this->assertEquals("Unauthorized.", $json);
  }

  public function getNext($n = false) {
    if ($n !== false) {
      $this->syncStep($n);
    }
    $json = $this->sync();
    return $json->_offline;
  }

  public function testAgainstReferenceFile() {
    $this->syncReset();
    $json = $this->getNext(100);
    $this->myAssertResponseAgainstReference($json);
  }

  public function testFlow() {
    $r = 53;
    $this->syncReset();
    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Picture", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Patient", 7);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Picture", 2);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Bill", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Patient", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Patient", 2);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Patient", 3);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInData($offline->data, "Patient", 4);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext($r); // $r-- -> already $r - 1
    $this->assertEquals(1, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals(0, $offline->remaining);
  }

  public function _createSyncAndDelete($cnt) {
    // Change patient
    $offline = self::syncFlush();
    $res = DB::statement("UPDATE patients SET updated_at = NOW() WHERE id = 1 LIMIT 1");
    $this->assertTrue($res);
    $offline  = self::getNext(1000);
    $this->assertEquals(0, $offline->remaining);
    $this->myAssertIsInData($offline->data, "Patient", 1);

    // Change file
    $res = DB::statement("UPDATE bills SET updated_at = NOW() WHERE id = 3 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(1000);
    $this->assertEquals(0, $offline->remaining);
    $this->myAssertIsInData($offline->data, "Bill", 3);

    // Simulating deleting a sub file for a patient
    $res = DB::statement("INSERT INTO deleteds(created_at, entity_type, entity_id) VALUES (NOW(), 'Bill', '1010')");
    $this->assertTrue($res);
    $offline = self::getNext(1000);
    $this->assertEquals(0, $offline->remaining);
    $this->myAssertIsInData($offline->data, "Deleted", false, [ "entity_type" => "Bill", "entity_id" => 1010 ]);
  }

  public function testChangesInDatabase() {
    $this->cp = self::$initialCP;

    // The sync is final before starting
    $offline = self::getNext(1000);
    $this->assertEquals(0, $offline->remaining);

    $this->_createSyncAndDelete("-");
  }

  public function testALotOfTimes() {
    for($i = 0; $i < 20; $i++)
      $this->_createSyncAndDelete($i);
  }
}

