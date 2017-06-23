<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class FichePatientTest extends FicheTestHelper {
	// Make Unit Tests are transactionals !
	use DatabaseTransactions;

	protected $model = "Patient";
	protected $collection = "patients";

	public function testCreate() {
		// Create it
    	$id = $this->doCreate([ "Name" => 'a name', 'entryyear' => '1000', 'entryorder' => '1' ])->id;

		// Modify it
    	$this->doUpdate($id, [ "Telephone" => "phone" ]);

		// Delete it
    	$this->doDelete($id);
	}
}
