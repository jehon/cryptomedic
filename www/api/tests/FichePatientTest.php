<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use PHPUnit\Framework\Attributes\Depends;

class FichePatientTest extends FicheTestHelper {
	// Unit Tests could not be transactionals since each test depends on the previous one!

	protected $model = "Patient";
	protected $collection = "patient";

	public function testCreate() {
		// Create it
    	$id = $this->doCreate([ "name" => 'a name', 'entry_year' => '1000', 'entry_order' => '1' ])['id'];

		return $id;
	}

	#[Depends("testCreate")]
	public function testUpdate($id) {
		// Modify it
    	$this->doUpdate($id, [ "phone" => "phone" ]);

		// Remove the value
		$result = $this->doUpdate($id, [ "phone" => "" ]);

		return $result;
	}

	#[Depends("testCreate")]
	#[Depends("testUpdate")]
	public function testOptimisticLocking($id, $fromUpdate) {
		$newPhone = "testOptimisticLocking";
		$original = $fromUpdate["folder"][0]["record"];

		$id = $original["id"];
		$originalPhone = $original["phone"];

		$file1 = JSON_decode(JSON_encode($original), true);
		$file1["phone"] = $newPhone;
		sleep(1);

		// Modify it
		$updated1 = $this->doUpdate($id, $file1, false)["folder"][0]["record"];

		// And it did works:
		$this->assertGreaterThan($file1["updated_at"], $updated1["updated_at"]);
		$this->assertEquals($newPhone, $updated1["phone"]);

		// To have updated_at not conflicting...
		sleep(1);

		// Modify it back: should not works
		$this->myRunAssertQuery(
			$this->getNewRequestOptionsBuilder()
			->setUrl("fiche/" . $this->collection . "/" . $id)
			->setMethod("PUT")
			->setParams($file1)
			->setExpected(409)
			->asText()
		);

		// $file2 should be the "updated" form
		$updated2 = $this->doGetFile($id, "Patient");

		// We should still have the "updated1" form
		$this->assertEquals($updated1["updated_at"], $updated2["updated_at"]);
		$this->assertEquals($newPhone, $updated2["phone"]);

		// Revert the change
		$file3 = JSON_decode(JSON_encode($updated2), true);
		$file3["phone"] = $originalPhone;

		$updated3 = $this->doUpdate($id, $file3, false)["folder"][0]["record"];

		// Change should have been commited
		$this->assertGreaterThanOrEqual($updated1["updated_at"], $updated3["updated_at"]);
		$this->assertEquals($originalPhone, $updated3["phone"]);
	}

	#[Depends("testCreate")]
	public function testDelete($id) {
		// Delete it
    	$this->doDelete($id);
	}
}
