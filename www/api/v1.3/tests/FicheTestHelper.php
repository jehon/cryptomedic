<?php

require_once("RouteReferenceTestCase.php");

use App\User;

class FicheTestHelper extends RouteReferenceTestCase {
  protected function getRowIndex($list, $type, $id = false, $data = false) {
    $found = false;
    foreach(array_keys($list) as $i) {
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
      return $i;
    }
    return false;
  }

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
    $id = $json->newKey;

    $i = $this->getRowIndex($json->folder, $model, $id);
    $this->assertNotFalse($i, "The record is not in the result");
    foreach($data as $k => $v) {
      $this->assertEquals($v, $json->folder[$i]->record->$k);
    }
    return $json->folder[$i];
  }

  public function doUpdate($model, $id, $data = []) {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/$model/" . $id)
          ->setMethod("PUT")
          ->setParams($data)
      );

    $this->assertEquals($id, $json->id);
    $i = $this->getRowIndex($json->folder, $model, $id);
    $this->assertNotFalse($i, "The record is not in the result");
    foreach($data as $k => $v) {
      $this->assertEquals($v, $json->folder[$i]->record->$k);
    }
    return $json;
  }

  public function doDelete($model, $id) {
    $json = $this->myRunAssertQuery(
    $this->getNewRequestOptionsBuilder()
      ->setUrl("fiche/$model/" . $id)
      ->setMethod("DELETE")
      );

    $this->assertEquals($id, $json->id);
    $i = $this->getRowIndex($json->folder, $model, $id);
    $this->assertFalse($i, "The record is still in the result");
  }
}
