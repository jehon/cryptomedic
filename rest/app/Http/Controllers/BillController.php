<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class BillController extends Controller {
	// @see http://laravel.com/docs/5.0/controllers
	
	// GET
	public function show($id) {
		$res = Bill::findOrFail($id);
		return response()->jsonOrJSONP($res);
	}
	
	// POST
	public function store() {
		
	}	
	
	// PUT / PATCH
	public function update($data) {
		
	}
	
	// DELETE
	public function destroy($id) {
		
	}

	// Unfreeze special route
	public function unfreeze($id) {
		
	}
}
