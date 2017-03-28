<?php

require_once("RouteReferenceTestCase.php");

use App\User;

class FicheTestHelper extends RouteReferenceTestCase {
  protected function myAssertIsInData($list, $type, $id = false, $data = false) {
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
