<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

require_once(__DIR__ . "/../../../../php/references.php");
use \References;

class PriceController extends Controller {
	public function index() 
	{
		$listing = DB::table('prices')->orderBy('id', 'ASC')->get();
		$nlisting = array();
		foreach($listing as $k => $v) 
		{
			$nlisting[$v->id] = $v;
		}
		return response()->jsonOrJSONP($nlisting);
	}
}
