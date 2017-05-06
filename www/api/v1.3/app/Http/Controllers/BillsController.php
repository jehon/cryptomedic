<?php

namespace App\Http\Controllers;

use App\Model\Bill;

class BillsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Bill";
	}
}
