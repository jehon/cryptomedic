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

use App\Http\Controllers\FolderController;

Route::pattern('id', '[0-9]+');

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

  // Public public
  Route::get('/templates/{category?}/{name?}', "TemplatesController@render");
  Route::post('/auth/mylogin', "AuthController@postMylogin");
  Route::get('/auth/logout', "AuthController@getLogout");

  // Without effect
  Route::get('admin/priceFields', "PricesController@priceFields");

  // Private
  Route::group(array('middleware' => 'authenticated'), function()
  {
    Route::get('/auth/settings', "AuthController@getSettings"); // TODO: legacy in v1.4
    Route::post('/auth/settings', "AuthController@getSettings");

    hasPermission('users.manage', function() {
      Route::get('users/emails', 'UsersController@emails');
      Route::resource('users', 'UsersController');
      Route::post('users/password/{id}', 'UsersController@password');
    });

    hasPermission('admin.securityMatrix', function() {
      Route::get('admin/securityMatrix', 'AuthController@matrix');
    });

    hasPermission('admin.checkPictures', function() {
      Route::get('admin/pictures/checkFileSystem', 'PicturesController@checkFileSystem');
    });


    hasPermission('reports.execute', function() {
      Route::get('reports/consultations', [
        "uses" => "ReportConsultationsController@index"
      ]);

      Route::get('reports/activity', [
        "uses" => "ReportActivityController@index"
      ]);

      Route::get('reports/statistical', [
        "uses" => "ReportStatisticalController@index"
      ]);

      Route::get('reports/surgical', [
        "uses" => "ReportSurgicalController@index"
      ]);
    });

    hasPermission('folder.read', function() {
      Route::resource('folder', "FolderController", [ "only" => [ "index" ]]);

      Route::get('folder/{model}/{id}', [
        "uses" => "FolderController@show"
      ]);

      Route::get('reference/{entryyear}/{entryorder}', [
        "uses" => "FolderController@reference"
      ]);

      Route::get('picture/{id}', [
        "uses" => "PicturesController@getFile"
      ]);

      Route::get('picture/{id}/thumbnail', [
        "uses" => "PicturesController@getThumbnail"
      ]);
    });

    hasPermission('folder.edit', function() {
      Route::POST('reference', 'FolderController@createfile');
    });

    Route::group([ 'prefix' => '/fiche/' ], function() {
      hasPermission('folder.edit', function() {
        Route::resource('appointments',          'AppointmentsController');
        Route::resource('bills',                 'BillsController');
        Route::resource('clubfeet' ,             'ClubFeetController');
        Route::resource('otherconsults',         'OtherConsultsController');
        Route::resource('patients',              'PatientsController');
        Route::resource('payments',              'PaymentsController');
        Route::resource('pictures',              'PicturesController');
        Route::resource('ricketconsults',        'RicketConsultsController');
        Route::resource('surgeries',             'SurgeriesController');
      });
      hasPermission('folder.unlock', function() {
        Route::get('appointments/unlock/{id}',   'AppointmentsController@unlock');
        Route::get('bills/unlock/{id}',          'BillsController@unlock');
        Route::get('clubfeet/unlock/{id}',       'ClubFeetController@unlock');
        Route::get('otherconsults/unlock/{id}',  'OtherConsultsController@unlock');
        Route::get('payments/unlock/{id}',       'PaymentsController@unlock');
        Route::get('pictures/unlock/{id}',       'PicturesController@unlock');
        Route::get('ricketconsults/unlock/{id}', 'RicketConsultsController@unlock');
        Route::get('surgeries/unlock/{id}',      'SurgeriesController@unlock');
      });
    });

    hasPermission('price.edit', function() {
      Route::resource('admin/prices',      'PricesController');
    });
  });
});
