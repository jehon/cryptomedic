<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::pattern('id', '[0-9]+');

Response::macro('jsonOrJSONP', function($value)
{
	// http://stackoverflow.com/questions/23996567/laravel-responsejson-with-numeric-check
	$res = response()->json($value, 200, [], JSON_NUMERIC_CHECK);
	
	// add a callback JSONP parameter if necessary
	if (Request::has('JSONP')) {
		$res->setCallback(Request::input('JSONP'));
	}
	return $res;
});

// TODO: add offline sync data
Response::macro('folder', function($id, $addData = array()) {
	$master = [];
	$master['_type'] = 'Folder';
	$master['id'] = $id;
	$master['mainFile'] = DB::table('patients')->where('id', $id)->first();
	if (!$master['mainFile']) {
		abort(404);
	}
	$master['mainFile']->_type = 'Patient';
	
	$master['subFiles'] = array();
	
	foreach(References::$model2db as $m => $c) {
		if ($c == "patients") continue;
			
		$r = DB::select("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
		foreach($r as $ri => $rv) {
			$rv->_type = References::db2model($c);
			$master['subFiles'][] = $rv;
		}
	}
	return response()->jsonOrJSONP(array_merge($master, $addData));
});


Route::get('/', 'WelcomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

/**
 * Authenticated user needed
 */
Route::group(array('middleware' => 'authenticated'), function() {
	Route::get('home', 'HomeController@index');
	
	Route::resource('folder', "FolderController");

	Route::get('related/{model}/{id}', [
		"uses" => "FolderController@related"
	]);
	
	Route::resource('price', "PriceController");
	
	Route::get('reports/consultations', [
		"uses" => "ReportConsultationsController@index"
	]);
	
	Route::get('reports/dailyActivity', [
		"uses" => "ReportActivityController@daily"
	]);
	
	Route::get('reports/monthlyActivity', [
			"uses" => "ReportActivityController@monthly"
	]);
	
	Route::get('reports/monthlyStatistical', [
			"uses" => "ReportStatisticalController@monthly"
	]);

	Route::get('reports/yearlyStatistical', [
			"uses" => "ReportStatisticalController@yearly"
	]);
});

Route::group(array('middleware' => [ "authenticated", "writeGroup" ] ), function() {
	Route::POST('/fiche/{model}', 'ModelController@store');
	Route::PUT('/fiche/{model}/{id}', 'ModelController@update');
	Route::DELETE('/fiche/{model}/{id}', 'ModelController@destroy');
});

Route::group(array('middleware' => [ "authenticated", 'unFreezeGroup' ]), function() {
	Route::get('unfreeze/{model}/{id}', 'ModelController@unfreeze');
});
	
	
// TODO: fiches picture
// TODO: references (new system?)
// TODO: authentification (+ settings)
// TODO: users (admin mode)

// TODO: migrate "myfiles" and "database->getVersion()" to cryptomedic
// TODO: offline sync --> middleware


