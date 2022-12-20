<?php

require_once("RouteReferenceTestCase.php");

class ReportFinanicialTest extends RouteReferenceTestCase {
	static public $year = "2014";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/financial")
			->setParams(['period' => self::YEARLY, 'year' => self::$year])
			// ->withReference()
			;
		
		}

	public function testYear() {
		$opt = $this->opt->clone();

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);
		// $this->assertArrayHasKey('totals', $json);
		$this->assertTrue(count($json['list']) >= 0);

		$this->assertEquals(4, count($json['list']));

		$v = $json['list'][0];
		$this->assertEquals('2014-103', $v['patient_reference']);
		$this->assertEquals(5, $v['age_at_first_consult']);
		$this->assertEquals(400, $v['price_consult']);
		$this->assertEquals(0, $v['price_medecine']);
		$this->assertEquals(0, $v['price_workshop']);
		$this->assertEquals(0, $v['price_surgical']);
		$this->assertEquals(1200, $v['price_other']);
		// $this->assertEquals(1600, $v['total_real']);
		// $this->assertEquals(320, $v['total_asked']);
		$this->assertEquals(138, $v['total_paid']);
		$this->assertEquals(0, $v['nbr_consults']);
		$this->assertEquals(2, $v['nbr_pictures']);
		$this->assertEquals(4, $v['nbr_bills']);

		$v = $json['list'][1];
		$this->assertEquals('2014-104', $v['patient_reference']);
		$this->assertEquals(7, $v['age_at_first_consult']);
		$this->assertEquals(200, $v['price_consult']);
		$this->assertEquals(0, $v['price_medecine']);
		$this->assertEquals(0, $v['price_workshop']);
		$this->assertEquals(20000, $v['price_surgical']);
		$this->assertEquals(800, $v['price_other']);
		// $this->assertEquals(21000, $v['total_real']);
		// $this->assertEquals(8400, $v['total_asked']);
		$this->assertEquals(0, $v['total_paid']);
		$this->assertEquals(0, $v['nbr_consults']);
		$this->assertEquals(0, $v['nbr_pictures']);
		$this->assertEquals(2, $v['nbr_bills']);

		$v = $json['list'][2];
		$this->assertEquals('2014-105', $v['patient_reference']);
		$this->assertEquals(1, $v['age_at_first_consult']);
		// $this->assertEquals(200, $v['price_consult']);
		// $this->assertEquals(0, $v['price_medecine']);
		// $this->assertEquals(0, $v['price_workshop']);
		// $this->assertEquals(20000, $v['price_surgical']);
		// $this->assertEquals(0, $v['price_other']);
		// // $this->assertEquals(8400, $v['total_real']);
		// // $this->assertEquals(7000, $v['total_asked']);
		// $this->assertEquals(0, $v['total_paid']);
		$this->assertEquals(6, $v['nbr_consults']);
		$this->assertEquals(1, $v['nbr_pictures']);
		// $this->assertEquals(3, $v['nbr_bills']);

		$v = $json['list'][3];
		$this->assertEquals('2014-107', $v['patient_reference']);
		$this->assertEquals($v['age_at_first_consult'], 12);
		// $this->assertEquals(200, $v['price_consult']);
		// $this->assertEquals(0, $v['price_medecine']);
		// $this->assertEquals(0, $v['price_workshop']);
		// $this->assertEquals(20000, $v['price_surgical']);
		// $this->assertEquals(0, $v['price_other']);
		// // $this->assertEquals(8400, $v['total_real']);
		// // $this->assertEquals(7000, $v['total_asked']);
		// $this->assertEquals(0, $v['total_paid']);
		// $this->assertEquals(0, $v['nbr_consults']);
		// $this->assertEquals(0, $v['nbr_pictures']);
		// $this->assertEquals(2, $v['nbr_bills']);
	}
}
