<?php

require_once("FicheTestHelper.php");

class FichePatientTest extends FicheTestHelper {
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
