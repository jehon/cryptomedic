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

Response::macro('folder', function($id, $addData = array()) {
	return response()->jsonOrJSONP(array_merge(getFolder($id), $addData));
});

// TODO: redefine the getFolder on FolderController
if (!function_exists("getFolder")) {
	function getFolder($id) {
		$master = [];
		$master['_type'] = 'Folder';
		$master['id'] = $id;
		$master['mainFile'] = DB::table('patients')->where('id', $id)->first();
		if (!$master['mainFile']) {
			abort(404);
		}
		$master['mainFile']->_type = 'Patient';
		
		$master['subFiles'] = array();
		
		foreach(References::$model2db as $c) {
			if ($c == "patients") continue;
				
			$r = DB::select("SELECT * FROM $c WHERE patient_id = :patient_id", array('patient_id' => $id));
			foreach($r as $rv) {
				$rv->_type = References::db2model($c);
				$master['subFiles'][] = $rv;
			}
		}
		return $master;
	}
}

/**
 * For anybody
 */
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

/**
 * Computer based authenticated routes
 */
Route::group(array('middleware' => 'authenticated'), function() {
	Route::all('sync', [ "uses" => "SyncController@sync" ]);
});

/**
 * Authenticated user needed
 */
Route::group(array('middleware' => 'authenticated'), function() {
	Route::get('home', 'HomeController@index');

	Route::resource('folder', "FolderController", [ "only" => [ "index", "show" ]]);

	Route::get('reference/{entryyear}/{entryorder}', [
		"uses" => "FolderController@reference"
	]);
	
	Route::get('reports/consultations', [
		"uses" => "ReportConsultationsController@index"
	]);
	
	Route::get('reports/dailyActivity', [
		"uses" => "ReportActivityController@daily"
	]);
	
	Route::get('reports/monthlyActivity', [
			"uses" => "ReportActivityController@monthly"
	]);
	
	Route::get('reports/statistical/{timing}', [
		"uses" => "ReportStatisticalController@byTiming"
	]);
	
	Route::get('reports/surgical/{timing}', [
		"uses" => "ReportSurgicalController@byTiming"
	]);
});

Route::group(array('middleware' => [ "authenticated", "writeGroup" ] ), function() {
	Route::POST('/fiche/{model}', 'ModelController@store');
	Route::PUT('/fiche/{model}/{id}', 'ModelController@update');
	Route::DELETE('/fiche/{model}/{id}', 'ModelController@destroy');
	Route::POST('/reference', 'FolderController@createfile');
});

Route::group(array('middleware' => [ "authenticated", 'unFreezeGroup' ]), function() {
	Route::get('unfreeze/{model}/{id}', 'ModelController@unfreeze');
});
	
// TODO MIGRATION: users (admin mode)
