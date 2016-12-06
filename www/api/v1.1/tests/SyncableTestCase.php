<?php

require_once("RouteReferenceTestCase.php");

use App\User;

class SyncableTestCase extends RouteReferenceTestCase {

  public function setUp($url = null, $params = array()) {
    parent::setUp($url, $params);
    $this->syncReset();
    $this->syncFlush();
  }

  public function myRunAssertQuery(RequestOptionsBuilder $opt = null) {
    if ($opt == null) {
      $opt = new RequestOptionsBuilder();
    }
    $opt->setSyncCheckpoint($this->syncCheckpoint);
    $opt->setSyncNbr($this->syncStep);

    $json = parent::myRunAssertQuery($opt);

    if ($opt->getAsJson()) {
      // Check the offline informations
      $this->assertNotNull($json->_offline, "No offline informations?");
      $this->assertNotNull($json->_offline->checkpoint);
      $this->assertNotNull($json->_offline->remaining);
      $this->assertNotNull($json->_offline->data);
    }

    return $json;
  }

  public function syncReset() {
    $this->syncCheckpoint = "";
    $this->syncStep = 1;
  }

  public function syncStep($n) {
    $this->syncStep = $n;
  }

  public function sync() {
    $json = $this->myRunAssertQuery(
      (new RequestOptionsBuilder())
        ->setUrl("sync")
      );

    $offline = $json->_offline;

    if ($this->syncCheckpoint == "") {
      // We asked for a reset
      $this->assertObjectHasAttribute('reset', $offline);
      $this->assertEquals(1, $offline->reset);
    }

    $this->assertObjectHasAttribute('data', $offline);
    $this->assertTrue(count($offline->data) <= $this->syncStep, "We received " . count($offline->data) . " while the maximum was " . $this->syncStep);

    // Store new situation
    $this->syncCheckpoint = $offline->checkpoint;
    return $json;
  }

  public function syncFlush() {
    $this->syncStep(1000);
    return $this->sync();
  }

  public function myAssertIsInOfflineData($offline, $type, $id = false, $data = false) {
    $found = false;
    foreach(array_reverse(array_keys($offline->data)) as $i => $v) {
      $v = $offline->data[$i];
      if ($v->type != $type) {
        continue;
      }
      if ($id !== false) {
        if ($v->id != $id) {
          continue;
        }
      }

      if ($data !== false) {
        $res = true;
        foreach($data as $k => $e) {
          if ($v->record->{$k} != $data[$k]) {
            $res = false;
          }
        }
        if (!$res) {
          continue;
        }
      }
      $this->assertTrue(true, "The record $type#$id is in the result");
      return $i;
    }
    $this->assertTrue(false, "The record $type#$id is not in the result");
    return false;
  }

  /* Obsolete */

  protected function myAssertJSON($group = null) {
    $json = parent::myAssertJSON($group);
    $this->offline = $json->_offline;
    unset($json->_offline);
    return $json;
  }
}
