<?php

namespace App\Http\Controllers;

use App\Model\Payment;

class PaymentsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Payment";
	}
}
