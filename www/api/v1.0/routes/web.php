<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

use App\Http\Controllers\SyncController;
use App\Http\Controllers\FolderController;

Route::pattern('id', '[0-9]+');

Response::macro('jsonOrJSONP', function($value)
{
  // add a callback JSONP parameter if necessary
  if (Request::header('X-OFFLINE-CP')) {
    $value['_offline'] = (new SyncController())->_syncData(Request::header('X-OFFLINE-CP'));
  }
  // http://stackoverflow.com/questions/23996567/laravel-responsejson-with-numeric-check
  $res = response()->json($value, 200, [], JSON_NUMERIC_CHECK);
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

Route::group([ 'prefix' => '/api/' . basename(dirname(__DIR__)) ], function() {
  Route::get('/', function () {
      return view('welcome');
  });

  Route::post('/auth/mylogin', "Auth\AuthController@postMylogin");
  Route::get('/auth/logout', "Auth\AuthController@getLogout");

  Route::get('/templates/{category?}/{name?}', "TemplatesController@render");

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
      Route::get('reports/consultations/{timing?}', [
        "uses" => "ReportConsultationsController@index"
      ]);

      Route::get('reports/activity/{timing?}', [
        "uses" => "ReportActivityController@index"
      ]);

      Route::get('reports/statistical/{timing?}', [
        "uses" => "ReportStatisticalController@index"
      ]);

      Route::get('reports/surgical/{timing}', [
        "uses" => "ReportSurgicalController@index"
      ]);
    });

    hasPermission('folder.read', function() {
      Route::resource('folder', "FolderController", [ "only" => [ "index", "show" ]]);

      Route::get('reference/{entryyear}/{entryorder}', [
        "uses" => "FolderController@reference"
      ]);

      Route::get('picture/{id}', [
        "uses" => "PictureController@getFile"
      ]);
      Route::get('picture/{id}/thumbnail', [
        "uses" => "PictureController@getThumbnail"
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

    hasPermission('admin.computers', function() {
      Route::get('admin/computers', 'ReportComputersController@index');
    });
  });
});
