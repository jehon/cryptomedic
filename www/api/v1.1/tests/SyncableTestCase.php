<?php

require_once("RouteReferenceTestCase.php");

use App\User;

class SyncableTestCase extends RouteReferenceTestCase {
  private $syncCheckpoint = "";
  private $syncStep = 1;

  public function setUp() {
    parent::setUp();
    $this->syncReset();
    $this->syncFlush();
  }

  public function myRunAssertQuery(RequestOptionsBuilder $opt = null) {
    if ($opt == null) {
      $opt = $this->getNewRequestOptionsBuilder();
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

  public function myRunAsserQueryWithoutOffline(RequestOptionsBuilder $opt = null) {
    $json = $this->myRunAssertQuery($opt);
    unset($json->_offline);
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
      $this->getNewRequestOptionsBuilder()
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

  public function myAssertIsInData($list, $type, $id = false, $data = false) {
    $found = false;
    foreach(array_reverse(array_keys($list)) as $i => $v) {
      $v = $list[$i];
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

  public function doCreate($model, $data = []) {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/$model")
          ->setMethod("POST")
          ->setParams($data)
      );

    $this->assertObjectHasAttribute('newKey', $json);
    $this->assertNotNull($json->newKey);
    $this->assertCount(1, $json->online);

    $id = $json->newKey;

    $i = $this->myAssertIsInData($json->online, $model, $id);
    foreach($data as $k => $v) {
      $this->assertEquals($v, $json->online[$i]->record->$k);
    }
    return $json;
  }

  public function doUpdate($model, $id, $data = []) {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/$model/" . $id)
          ->setMethod("PUT")
          ->setParams($data)
      );

    $this->assertEquals($id, $json->id);
    $this->assertCount(1, $json->online);
    $i = $this->myAssertIsInData($json->online, $model, $id);
    foreach($data as $k => $v) {
      $this->assertEquals($v, $json->online[$i]->record->$k);
    }
    return $json;
  }

  public function doDelete($model, $id) {
    $json = $this->myRunAssertQuery(
    $this->getNewRequestOptionsBuilder()
      ->setUrl("fiche/$model/" . $id)
      ->setMethod("DELETE")
      );

    $this->assertCount(1, $json->online);
    $i = $this->myAssertIsInData($json->online, "Deleted", false, [ "entity_type" => $model, "entity_id" => $id ]);
  }
}
