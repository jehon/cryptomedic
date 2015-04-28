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
//Route::model('folder', 'App\Folder');


Response::macro('jsonOrJSONP', function($value)
{
	// http://stackoverflow.com/questions/23996567/laravel-responsejson-with-numeric-check
	$res = response()->json($value, 200, [], JSON_NUMERIC_CHECK);
	
	// add a callback JSONP parameter if necessary
	if (Request::has('JSONP')) {
		$res->setCallback(Request::input('JSONP'));
// 			->header("Content-Type", "application/javascript");
	}
	
	return $res;
});


Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

/**
 * Authenticated user needed
 */
Route::group(array('middleware' => 'auth'), function() {
	Route::resource('folder', "FolderController");

	Route::get('related/{model}/{id}', [
// 	"middleware" => 'auth',
	"uses" => "FolderController@related"
	]);
	
});

// Route::get('related/{model}/{id}', [
// 	"middleware" => 'auth',
// 	"uses" => "FolderController@related"
// ]);

// Route::any('folder/{id}', [ 
// 	"uses" => "FolderController@get"
// ]);
