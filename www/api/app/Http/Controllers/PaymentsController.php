<?php

namespace App\Http\Controllers;

use App\Model\Payment;

class PaymentsController extends FicheController {
	static public function getModelClass() {
		return "App\\Model\\Payment";
	}
}
