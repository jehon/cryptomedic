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


Route::get('/', 'WelcomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

// TODO: settings

/**
 * Authenticated user needed
 */
Route::group(array('middleware' => 'auth'), function() {
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
	
	// TODO: report monthlyStatistical
	// TODO: report activity (not implemented)
	// TODO: report patients (not implemented)
});


// TODO: fiches (write mode)
// TODO: upload (write mode)
// TODO: references (new system?)
// TODO: users (admin mode)
// TODO: offline sync --> middleware

// TODO: migrate "myfiles" and "database->getVersion()" to cryptomedic

// 	Route::get('references', [
// 		"uses" => "FolderController@reference"
// 	]);
	

// *** Other examples ***

// Route::model('folder', 'App\Folder');

// Route::any('folder/{id}', [ 
//		"middleware" => 'auth',
// 	"uses" => "FolderController@get"
// ]);
