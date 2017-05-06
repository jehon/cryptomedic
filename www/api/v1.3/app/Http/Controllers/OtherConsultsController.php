<?php

namespace App\Http\Controllers;

use App\Model\OtherConsult;

class OtherConsultsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\OtherConsult";
	}
}
