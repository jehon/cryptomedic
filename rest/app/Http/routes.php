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
	
	// Search folders
	// Get one folder
	Route::resource('folder', "FolderController");

	// Related route
	Route::get('related/{model}/{id}', [
		"uses" => "FolderController@related"
	]);

	// TODO: consultations
	// TODO: prices
	// TODO: references
	// TODO: templates
	// TODO: report activity
	// TODO: report dailyActivity
	// TODO: report monthlyActivity
	// TODO: report monthlyStatistical
	// TODO: report patients
});

// Route::model('folder', 'App\Folder');

// TODO: fiches (write mode)
// TODO: upload (write mode)
// TODO: report resizePicture (admin mode)
	
// Route::any('folder/{id}', [ 
//		"middleware" => 'auth',
// 	"uses" => "FolderController@get"
// ]);
