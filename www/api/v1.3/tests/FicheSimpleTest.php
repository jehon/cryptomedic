<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class FicheSimpleTest extends FicheTestHelper {
	// Make Unit Tests are transactionals !
	use DatabaseTransactions;

	protected $model = "Patient";
	protected $collection = "patients";
	
	public function testOptimisticLocking() {
		$newPhone = "testOptimisticLocking";

		$original = $this->myRunAssertQuery(
			$this->getNewRequestOptionsBuilder()
				->setUrl("folder/Patient/6")
		)["folder"][0]["record"];

		$id = $original["id"];
		$originalPhone = $original["Telephone"];

		$file1 = JSON_decode(JSON_encode($original), true);
		$file1["Telephone"] = $newPhone;

		// Modify it
		$updated1 = $this->doUpdate($id, $file1, false)["folder"][0]["record"];

		// And it did works:
		$this->assertGreaterThan($file1["updated_at"], $updated1["updated_at"]);
		$this->assertEquals($newPhone, $updated1["Telephone"]);

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
		$updated2 = $this->myRunAssertQuery(
			$this->getNewRequestOptionsBuilder()
				->setUrl("folder/Patient/6")
		)["folder"][0]["record"];

		// We should still have the "updated1" form
		$this->assertEquals($updated1["updated_at"], $updated2["updated_at"]);
		$this->assertEquals($newPhone, $updated2["Telephone"]);

		// Revert the change
		$file3 = JSON_decode(JSON_encode($updated2), true);
		$file3["Telephone"] = $originalPhone;

		$updated3 = $this->doUpdate($id, $file3, false)["folder"][0]["record"];

		// Change should have been commited
		$this->assertGreaterThanOrEqual($updated1["updated_at"], $updated3["updated_at"]);
		$this->assertEquals($originalPhone, $updated3["Telephone"]);
	}
}
