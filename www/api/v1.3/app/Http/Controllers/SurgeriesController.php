<?php

namespace App\Http\Controllers;

use App\Model\RicketConsult;

class SurgeriesController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Surgery";
	}
}
