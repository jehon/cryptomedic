<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Flow\JSONPath\JSONPath;

class FicheBillTest extends FicheTestHelper {
  // Make Unit Tests are transactionals !
  use DatabaseTransactions;

  protected $model = "Bill";
  protected $collection = "bills";

	public function testCreateWithoutPatientId() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/" . $this->collection)
          ->setMethod("POST")
          ->setExpected(400)
          ->asText()
      );
	}

	public function testCreate() {
		// Create it
    $file = $this->doCreate([ "patient_id" => '1' ]);

		// Modify it
    $json = $this->doUpdate($file['id'], [ 
      "ExaminerName" => "Ershad",
      "Date" => "2017-01-20",
      "bill_lines" => [
        [
          "title" => "consult_CDC_consultation_Bengali_Doctor", 
          "Amount" => "2"
        ]
      ]
    ], false);

    // https://packagist.org/packages/flow/jsonpath

    var_dump($file['id']);

    $res = (new JSONPath($json))->find('$.folder.[?(@.type=Bill)][?(@.id=' .  $file['id'] . ')]')[0];
    var_dump($res);
    $this->assertArrayHasKey('bill_lines', $res);
    $this->assertEquals(count($res['bill_lines']), 1);

    $this->assertArrayHasKey('title', $res['bill_lines'][0]);
    $this->assertEquals($res['bill_lines'][0]['title'], 'consult_CDC_consultation_Bengali_Doctor');

    $this->assertArrayHasKey('Amount', $res['bill_lines'][0]);
    $this->assertEquals($res['bill_lines'][0]['Amount'], 2);

    $this->assertArrayHasKey('ExaminerName', $res['bill_lines'][0]);
    $this->assertEquals($res['bill_lines'][0]['ExaminerName'], "Ershad");

    $this->assertArrayHasKey('Date', $res['bill_lines'][0]);
    $this->assertEquals($res['bill_lines'][0]['Date'], "2017-01-20");

		// Delete it
    $this->doDelete($file['id']);
	}
}
