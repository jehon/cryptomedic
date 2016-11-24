<?php

require_once("RouteReferenceTestCase.php");

class SyncTest extends RouteReferenceTestCase {
  protected $cp = "";
  protected $offline = null;
  static protected $initialCP = "";

  public function setUp($url = null, $params = array()) {
    parent::setUp("sync");
  }

  public function testsUnauthenticated() {
    $this->setUrl("sync", [ "cp" => "" ]);
    $this->myAssertUnauthorized();
  }

  public function getNext($n = 1, $cp = false) {
    $this->setUrl("sync", [ "n" => $n ] + ($cp ? [ "cp" => $cp ] : [])); // "cp" => $this->cp,
    $json = $this->myAssertJSON("readonly");

    $offline = $this->offline;

    $this->assertObjectHasAttribute('data', $offline);
    $this->assertObjectHasAttribute('checkpoint', $offline);
    if ($cp === "") {
      $this->assertObjectHasAttribute('reset', $offline);
      $this->assertEquals(1, $offline->reset);
    }
    $this->offline = $offline;
    return $offline;
  }

  public function testFlow() {
    $r = 48;
    $offline = $this->getNext(1, "");
    $this->assertEquals("Picture", $offline->data[0]->type);
    $this->assertEquals(1, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Patient", $offline->data[0]->type);
    $this->assertEquals(7, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Picture", $offline->data[0]->type);
    $this->assertEquals(2, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Bill", $offline->data[0]->type);
    $this->assertEquals(1, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Patient", $offline->data[0]->type);
    $this->assertEquals(1, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Patient", $offline->data[0]->type);
    $this->assertEquals(2, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Patient", $offline->data[0]->type);
    $this->assertEquals(3, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals("Patient", $offline->data[0]->type);
    $this->assertEquals(4, $offline->data[0]->id);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext($r); // $r-- -> already $r - 1
    $this->assertEquals(1, $offline->remaining);

    $offline = $this->getNext(1);
    $this->assertEquals(0, $offline->remaining);

    self::$initialCP = $this->cp;
  }

  public function _createSyncAndDelete($cnt) {
    // Change patient
    $offline = self::getNext(1000);
    $res = DB::statement("UPDATE patients SET updated_at = NOW() WHERE id = 1 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(1000);
    $this->assertTrue(count(array_filter($offline->data, function($rec) {
      return $rec->type == "Patient" && $rec->id = 1;
    })) > 0);

    // Change file
    $res = DB::statement("UPDATE bills SET updated_at = NOW() WHERE id = 3 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(1000);
    $this->assertTrue(count(array_filter($offline->data, function($rec) {
      return $rec->type == "Bill" && $rec->id = 3;
    })) > 0);

    // Simulating deleting a sub file for a patient
    $res = DB::statement("INSERT INTO deleteds(created_at, patient_id, entity_type, entity_id) VALUES (NOW(), '1010', 'bills', '10'); ");
    $offline = self::getNext(1000);
    $this->assertTrue(count(array_filter($offline->data, function($rec) {
      return $rec->type == "Deleted" && $rec->id = 1010;
    })) > 0);
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
