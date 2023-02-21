<?php

namespace App\Http\Controllers;

use App\Model\RicketConsult;

class RicketConsultsController extends FicheController {
	static public function getModelClass() {
		return "App\\Model\\RicketConsult";
	}
}
