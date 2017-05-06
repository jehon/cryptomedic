<?php

namespace App\Http\Controllers;

use App\Model\Appointment;

class AppoinmentsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Appointment";
	}
}
