<?php

require_once("SyncableTestCase.php");

class FichePatientTest extends SyncableTestCase {
  protected $model = "Patient";

	public function testCreate() {
		// Create it
    $id = $this->doCreate($this->model, [ "Name" => 'a name', 'entryyear' => '1000', 'entryorder' => '1' ])->online[0]->id;

		// Modify it
    $this->doUpdate($this->model, $id, [ "Telephone" => "phone" ]);

		// Delete it
    $this->doDelete($this->model, $id);
	}
}
