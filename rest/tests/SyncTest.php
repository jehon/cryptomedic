<?php

require_once("RouteReferenceTestCase.php");

class SyncTest extends RouteReferenceTestCase {
	public static $cp = "";
	public static $ord = 0;

	public function getNext($n = 1) {
		$this->setUrl("sync", [ "cp" => self::$cp, "n" => $n ]);
		$json = $this->myAssertJSON("readonly"); //, "sync-" . self::$ord++);

		$this->assertObjectHasAttribute('_offline', $json);
		$offline = $json->_offline;

		if (!property_exists($offline, "isfinal") || !$offline->isfinal) {
			$this->assertObjectHasAttribute('data', $offline);
		}
		$this->assertObjectHasAttribute('checkpoint', $offline);
		if (!self::$cp) {
			$this->assertObjectHasAttribute('reset', $offline);
			$this->assertEquals(1, $offline->reset);
		}
		self::$cp = $offline->checkpoint;
		return $offline;
	}

	public function setUp($url = null, $params = array()) {
		parent::setUp("sync");
	}

	protected function thisAssertResponse($json) {

		return $offline;
	}

	public function testsUnauthenticated() {
		$this->setUrl("sync", [ "cp" => "" ]);
		$this->myAssertUnauthorized();
	}

	public function testFlow() {
		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(7, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(2, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(3, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(4, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(1, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(6, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(5, $offline->data[0]->record->id);

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(9, $offline->data[0]->id);

		$this->assertObjectHasAttribute('isfinal', $offline);
		$this->assertEquals(1, $offline->isfinal);
	}

}
