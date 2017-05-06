<?php

require_once("FicheTestHelper.php");

class FichePatientTest extends FicheTestHelper {
  protected $model = "Patient";

	public function testCreate() {
		// Create it
    	$id = $this->doCreate($this->model, [ "Name" => 'a name', 'entryyear' => '1000', 'entryorder' => '1' ])->id;

		// Modify it
    	$this->doUpdate($this->model, $id, [ "Telephone" => "phone" ]);

		// Delete it
    	$this->doDelete($this->model, $id);
	}
}
