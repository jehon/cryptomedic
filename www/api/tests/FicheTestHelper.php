<?php

require_once("RouteReferenceTestCase.php");

use App\Model\User;

class FicheTestHelper extends RouteReferenceTestCase {
  protected function getRowIndex($list, $type, $id = false, $data = false) {
    $found = false;
    foreach(array_keys($list) as $i) {
      $v = $list[$i];
      if ($v['type'] != $type) {
        continue;
      }
      if ($id !== false) {
        if ($v['id'] != $id) {
          continue;
        }
      }

      if ($data !== false) {
        $res = true;
        foreach($data as $k => $e) {
          if ($v['record'][$k] != $data[$k]) {
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
      if ($v['type'] != $type) {
        continue;
      }
      if ($id !== false) {
        if ($v['id'] != $id) {
          continue;
        }
      }

      if ($data !== false) {
        $res = true;
        foreach($data as $k => $e) {
          if ($v['record'][$k] != $data[$k]) {
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

  public function doGetFile($patient_id, $type = null, $id = false) {
	if ($id == -1) {
		$id = $patient_id;
	}
	$json = $this->myRunAssertQuery(
		$this->getNewRequestOptionsBuilder()
			->setUrl("folder/Patient/" . $patient_id)
	);
	if ($type == "null") {
		return $json;
	}
	$i = $this->getRowIndex($json['folder'], $this->model, $id);
	return $json['folder'][$i]['record'];
  }

  public function doCreate($data = []) {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/" . $this->collection)
          ->setMethod("POST")
          ->setParams($data)
      );

    $this->assertArrayHasKey('newKey', $json);
    $this->assertNotNull($json['newKey']);
    $id = $json['newKey'];

    $i = $this->getRowIndex($json['folder'], $this->model, $id);
    $this->assertNotFalse($i, "The record is not in the result");
    foreach($data as $k => $v) {
      $this->assertEquals($v, $json['folder'][$i]['record'][$k]);
    }
    return $json['folder'][$i];
  }

  public function doUpdate($id, $data = [], $testEqual = true) {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/" . $this->collection . "/" . $id)
          ->setMethod("PUT")
          ->setParams($data)
      );

    $i = $this->getRowIndex($json['folder'], $this->model, $id);
    $this->assertNotFalse($i, "The record is not in the result");

    if ($testEqual) {
      	$this->assertEquals($id, $json['id']);
      	foreach($data as $k => $v) {
			if (!array_key_exists($k, $json['folder'][$i]['record'])) {
				throw new Error("Data received does not contains [$i] in record: $k - " . JSON_encode($json['folder'][$i]));
			}
			$this->assertEquals($v, $json['folder'][$i]['record'][$k]);
      	}
    }
    return $json;
  }

  public function doDelete($id) {
    $json = $this->myRunAssertQuery(
      $this->getNewRequestOptionsBuilder()
        ->setUrl("fiche/" . $this->collection . "/" . $id)
        ->setMethod("DELETE")
      );

    $this->assertEquals($id, $json['id']);
    $i = $this->getRowIndex($json['folder'], $this->model, $id);
    $this->assertFalse($i, "The record is still in the result");
  }
}
