<?php

namespace App\Http\Controllers;

use App\Model\Appointment;

class AppointmentsController extends ModelController {
	static public function getModelClass() {
		return "App\\Model\\Appointment";
	}
}
