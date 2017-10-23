<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Flow\JSONPath\JSONPath;

class FicheBillTest extends FicheTestHelper {
  // Make Unit Tests are transactionals !
  // use DatabaseTransactions;

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
    return $file;
  }

  /**
   * @depends testCreate
   */
  public function testUpdate1($file) {
		// Modify it
    $json = $this->doUpdate($file['id'], [ 
      "ExaminerName" => "Ershad",
      "Date" => "2017-01-20",
      "bill_lines" => [
        [
          "title" => "consult_CDC_consultation_Bengali_Doctor", 
          "Amount" => "2"
        ],
        [
          "title" => "consult_CDC_consultation_Doctor", 
          "Amount" => "3"
        ]
      ]
    ], false);

    // https://packagist.org/packages/flow/jsonpath
    $res = (new JSONPath($json))->find('$.folder.[?(@.type=Bill)][?(@.id=' .  $file['id'] . ')]')->data()[0];

    $this->assertArrayHasKey('bill_lines', $res);
    $this->assertEquals(2, count($res['bill_lines']));

    // Fist one

    $this->assertArrayHasKey('title', $res['bill_lines'][0]);
    $this->assertEquals('consult_CDC_consultation_Bengali_Doctor', $res['bill_lines'][0]['title']);

    $this->assertArrayHasKey('Amount', $res['bill_lines'][0]);
    $this->assertEquals(2, $res['bill_lines'][0]['Amount']);

    $this->assertArrayHasKey('ExaminerName', $res['bill_lines'][0]);
    $this->assertEquals("Ershad", $res['bill_lines'][0]['ExaminerName']);

    $this->assertArrayHasKey('Date', $res['bill_lines'][0]);
    $this->assertEquals("2017-01-20", $res['bill_lines'][0]['Date']);

    // Second one

    $this->assertEquals('consult_CDC_consultation_Doctor', $res['bill_lines'][1]['title']);
    $this->assertEquals(3, $res['bill_lines'][1]['Amount']);

    return $res;
  }

  /**
   * @depends testCreate
   * @depends testUpdate1
   */
  public function testUpdate2($file, $res) {

    // Update it with change and create
    $res['bill_lines'][0]['Amount'] = 9;
    unset($res['bill_lines'][1]);

    $json = $this->doUpdate($file['id'], $res, false);

    // https://packagist.org/packages/flow/jsonpath
    $res = (new JSONPath($json))->find('$.folder.[?(@.type=Bill)][?(@.id=' .  $file['id'] . ')]')->data()[0];

    $this->assertArrayHasKey('bill_lines', $res);
    $this->assertEquals(1, count($res['bill_lines']));

    $this->assertArrayHasKey('title', $res['bill_lines'][0]);
    $this->assertEquals('consult_CDC_consultation_Bengali_Doctor', $res['bill_lines'][0]['title']);

    $this->assertArrayHasKey('Amount', $res['bill_lines'][0]);
    $this->assertEquals(9, $res['bill_lines'][0]['Amount']);
  }

  /**
   * @depends testCreate
   * @depends testUpdate1
   * @depends testUpdate2
   */
  public function testDelete($file, $res, $res2) {
		// Delete it
    $this->doDelete($file['id']);
	}
}
