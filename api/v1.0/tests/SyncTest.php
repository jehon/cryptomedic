<?php

require_once("RouteReferenceTestCase.php");

class SyncTest extends RouteReferenceTestCase {
	protected $cp = "";
	protected $offline = null;
	static protected $timeShift = 2;
	static protected $initialCP = "";

	protected function showURL() {
		echo "\n";
		echo "http://localhost/cryptomedic/rest/public/sync?cp=" . $this->cp;
		echo "\n";
	}

	public function isFinal() {
		$this->assertObjectHasAttribute('isfinal', $this->offline);
		$this->assertEquals(1, $this->offline->isfinal);
	}

	public function getNext($n = 1) {
		$this->setUrl("sync", [ "cp" => $this->cp, "n" => $n ]);
		$json = $this->myAssertJSON("readonly");

		$this->assertObjectHasAttribute('_offline', $json);
		$offline = $json->_offline;

		if (!property_exists($offline, "isfinal") || !$offline->isfinal) {
			$this->assertObjectHasAttribute('data', $offline);
		}
		$this->assertObjectHasAttribute('checkpoint', $offline);
		if (!$this->cp) {
			$this->assertObjectHasAttribute('reset', $offline);
			$this->assertEquals(1, $offline->reset);
		}
		$this->cp = $offline->checkpoint;
		$this->offline = $offline;
		return $offline;
	}

	public function setUp($url = null, $params = array()) {
		parent::setUp("sync");
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

		$offline = self::getNext(1);
		$this->assertArrayHasKey(0, $offline->data);
		$this->assertEquals(2, $offline->data[0]->record->id);
		$this->isFinal();

		self::$initialCP = $this->cp;
	}

	public function testChangesInDatabase() {
		$this->cp = self::$initialCP;

		// The sync is final before starting
		$offline = self::getNext(1);
		$this->isFinal();

		// Change patient
		$res = DB::statement("UPDATE patients SET updated_at = NOW() + " . self::$timeShift++ . " WHERE id = 1 LIMIT 1");
		$this->assertTrue($res);
		$offline = self::getNext(1);
		var_dump($offline);
		$this->assertArrayHasKey(0, $offline->data, "First step: update patient");
		$this->assertEquals(1, $offline->data[0]->record->id);
		$this->isFinal();

		// Change file
		$res = DB::statement("UPDATE bills SET updated_at = NOW() + " . self::$timeShift++ . " WHERE patient_id = 3 LIMIT 1");
		$this->assertTrue($res);
		$offline = self::getNext(1);
		var_dump($offline);
		$this->assertArrayHasKey(0, $offline->data, "Second step: update bill");
		$this->assertEquals(3, $offline->data[0]->record->id);
		$this->isFinal();

		// Simulating deleting a sub file for a patient
		$res = DB::statement("INSERT INTO deleteds(created_at, patient_id, entity_type, entity_id) VALUES (NOW() + " . self::$timeShift++ . ", '4', 'bills', '10'); ");
		$this->assertTrue($res);
		$offline = self::getNext(1);
		var_dump($offline);
		$this->assertArrayHasKey(0, $offline->data, "Third step: deleted");
		$this->assertEquals(4, $offline->data[0]->record->id);
		$this->isFinal();
	}
}
