<?php

namespace App\Http\Controllers;

use App\Model\Patient;

class PatientsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Patient";
	}
}
