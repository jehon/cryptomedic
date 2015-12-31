<?php

use App\Http\Controllers\SyncController;
use App\Http\Controllers\FolderController;
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
	// add a callback JSONP parameter if necessary
	if (Request::has('JSONP')) {
		$res->setCallback(Request::input('JSONP'));
	} else {
		if (Request::header('X-OFFLINE-CP')) {
			$value['_offline'] = (new SyncController())->_syncData(Request::header('X-OFFLINE-CP'));
		}
		// http://stackoverflow.com/questions/23996567/laravel-responsejson-with-numeric-check
		$res = response()->json($value, 200, [], JSON_NUMERIC_CHECK);
	}
	return $res;
});

Response::macro('folder', function($id, $addData = array()) {
	return response()->jsonOrJSONP(array_merge(FolderController::getFolderOrFail($id), $addData));
});

// Check permissions
if (!function_exists('hasPermission')) {
	function hasPermission($permission, $fn) {
		return Route::group([ 'middleware' => 'hasPermission:' . $permission ], $fn);
	}
}

/**
 * For anybody
 */

if (array_key_exists('REQUEST_URI', $_SERVER)) {
	$flavor = explode('/', $_SERVER['REQUEST_URI'])[1];
} else {
	$flavor = "cryptomedic";
}

Route::group([ 'prefix' => '/' . $flavor . '/api/' . basename(dirname(dirname(__DIR__))) ], function() {
	// Route::controllers([
		// 'auth' => 'Auth\AuthController',
		// 'password' => 'Auth\PasswordController',
	// ]);

	Route::post('/auth/mylogin', "Auth\AuthController@postMylogin");
	Route::get('/auth/logout', "Auth\AuthController@getLogout");

	/**
	 * Computer based authenticated routes
	 */
	 // TODO: protect with computer authentication instead of user authentication
	Route::group(array('middleware' => 'authenticated'), function() {
		Route::any('sync', [ "uses" => "SyncController@sync" ]);
	});

	/**
	 * Authenticated user needed
	 */
	Route::group(array('middleware' => 'authenticated'), function() {
		Route::get('/auth/settings', "Auth\AuthController@getSettings");

		hasPermission('reports.execute', function() {
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

		hasPermission('folder.read', function() {
			Route::resource('folder', "FolderController", [ "only" => [ "index", "show" ]]);

			Route::get('reference/{entryyear}/{entryorder}', [
				"uses" => "FolderController@reference"
			]);
		});

		hasPermission('folder.edit', function() {
			Route::POST('/fiche/{model}', 'ModelController@store');
			Route::PUT('/fiche/{model}/{id}', 'ModelController@update');
			Route::DELETE('/fiche/{model}/{id}', 'ModelController@destroy');
			Route::POST('/reference', 'FolderController@createfile');
		});

		hasPermission('folder.unlock', function() {
			Route::get('unfreeze/{model}/{id}', 'ModelController@unfreeze');
		});

		hasPermission('users.manage', function() {
			Route::resource('users', 'UsersController');
			Route::post('users/password/{id}', 'UsersController@password');
		});

		hasPermission('admin.securityMatrix', function() {
      Route::get('admin/securityMatrix', 'Auth\AuthController@matrix');
    });
	});
});
