<?php namespace App\Http\Controllers;

// Migration 5.1 -> 5.2
// use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {
	use DispatchesJobs, ValidatesRequests;
}
