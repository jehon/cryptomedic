<?php

require_once("RouteReferenceTestCase.php");
require_once("SyncableTestCase.php");

class SyncTest extends SyncableTestCase {
  protected $cp = "";
  protected $offline = null;
  static protected $initialCP = "";

  public function setUp($url = null, $params = array()) {
    parent::setUp("sync");
  }

  public function testsUnauthenticated() {
    $this->syncReset();
    $json = $this->myRunAssertQuery(
      (new RequestOptionsBuilder())
        ->setUrl("sync")
        ->setUnauthenticated()
        ->setExpected(401)
        ->setAsJson(false)
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

  public function testFlow() {
    $r = 48;
    $this->syncReset();
    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Picture", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Patient", 7);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Picture", 2);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Bill", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Patient", 1);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Patient", 2);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Patient", 3);
    $this->assertEquals($r--, $offline->remaining);

    $offline = $this->getNext(1);
    $this->myAssertIsInOfflineData($offline, "Patient", 4);
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
    $this->myAssertIsInOfflineData($offline, "Patient", 1);

    // Change file
    $res = DB::statement("UPDATE bills SET updated_at = NOW() WHERE id = 3 LIMIT 1");
    $this->assertTrue($res);
    $offline = self::getNext(1000);
    $this->myAssertIsInOfflineData($offline, "Bill", 3);

    // Simulating deleting a sub file for a patient
    $res = DB::statement("INSERT INTO deleteds(entity_type, entity_id) VALUES ('Bill', '1010')");
    $offline = self::getNext(1000);
    $this->myAssertIsInOfflineData($offline, "Deleted", false, [ "entity_type" => "Bill", "entity_id" => 1010 ]);
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
