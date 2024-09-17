<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//    Those routes are automatically prefixed with "/api" by laravel
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FolderController;
use App\Helpers\CRSecurity;

Route::pattern('id', '[0-9]+');

/**
 * For anybody
 */
// Public public
Route::get('templates/{category?}/{name?}', "TemplatesController@render");
Route::post('auth/mylogin', "AuthController@postMylogin");
Route::get('auth/logout', "AuthController@getLogout");

// Without effect
// TODO: not working
// Route::get('admin/priceFields', "PricesController@priceFields");
Route::get('browsers/clean', 'BrowsersController@clean');
Route::get('browsers/stats', 'BrowsersController@stats');

Route::get('system/lists/all', 'SystemController@allLists');

// Private
Route::group(array('middleware' => 'authenticated'), function() {
  Route::get('auth/settings', "AuthController@getSettings");

  CRSecurity::ifHasPersmission('users.manage', function() {
    Route::get('users/emails', 'UsersController@emails');
    Route::resource('users', 'UsersController');
    Route::post('users/password/{id}', 'UsersController@password');
  });

  CRSecurity::ifHasPersmission('admin.securityMatrix', function() {
    Route::get('admin/securityMatrix', 'AuthController@matrix');
  });

  CRSecurity::ifHasPersmission('admin.checkPictures', function() {
    Route::get('admin/pictures/checkFileSystem', 'PicturesController@checkFileSystem');
  });


  CRSecurity::ifHasPersmission('reports.execute', function() {
    Route::get('reports/consultations', [
      "uses" => "ReportConsultationsController@index"
    ]);

    Route::get('reports/activity', [
      "uses" => "ReportActivityController@index"
    ]);

    Route::get('reports/cash-register', [
      "uses" => "ReportCashRegisterController@index"
    ]);

    Route::get('reports/financial', [
      "uses" => "ReportFinancialController@index"
    ]);

    Route::get('reports/statistical', [
      "uses" => "ReportStatisticalController@index"
    ]);

    Route::get('reports/surgical', [
      "uses" => "ReportSurgicalController@index"
    ]);

    Route::get('reports/surgical-suggested', [
      "uses" => "ReportSurgicalSuggestedController@index"
    ]);
  });

  CRSecurity::ifHasPersmission('folder.read', function() {
    Route::resource('folder', "FolderController", [ "only" => [ "index" ]]);
    Route::get('patients/{id}', "PatientsController@show");

    Route::get('folder/{model}/{id}', [
      "uses" => "FolderController@show"
    ]);

    Route::get('reference/{entry_year}/{entry_order}', [
      "uses" => "FolderController@reference"
    ]);

    Route::get('picture/{id}', [
      "uses" => "PicturesController@getFile"
    ]);

    Route::get('picture/{id}/thumbnail', [
      "uses" => "PicturesController@getThumbnail"
    ]);
  });

  CRSecurity::ifHasPersmission('folder.edit', function() {
    Route::POST('reference', 'FolderController@createfile');
  });

  Route::group([ 'prefix' => '/fiche/' ], function() {
    // Legacy routes
    CRSecurity::ifHasPersmission('folder.edit', function() {
      Route::resource('bills',                 'BillsController');
      Route::resource('clubfeet' ,             'ClubFeetController');
      Route::resource('otherconsults',         'OtherConsultsController');
      Route::resource('patients',              'PatientsController');
      Route::resource('payments',              'PaymentsController');
      Route::resource('pictures',              'PicturesController');
      Route::resource('ricketconsults',        'RicketConsultsController');
      Route::resource('surgeries',             'SurgeriesController');
    });

    // Legacy routes
    // TODO: should be PUT
    CRSecurity::ifHasPersmission('folder.unlock', function() {
      Route::get('bills/unlock/{id}',          'BillsController@unlock');
      Route::get('clubfeet/unlock/{id}',       'ClubFeetController@unlock');
      Route::get('otherconsults/unlock/{id}',  'OtherConsultsController@unlock');
      Route::get('payments/unlock/{id}',       'PaymentsController@unlock');
      Route::get('pictures/unlock/{id}',       'PicturesController@unlock');
      Route::get('ricketconsults/unlock/{id}', 'RicketConsultsController@unlock');
      Route::get('surgeries/unlock/{id}',      'SurgeriesController@unlock');
    });

    // New routes
    CRSecurity::ifHasPersmission('folder.edit', function() {
      Route::resource('appointment',             'AppointmentsController');
      // Route::resource('bill',                    'BillsController');
      // Route::resource('consult_clubfoot' ,       'ClubFeetController');
      // Route::resource('consult_other',           'OtherConsultsController');
      // Route::resource('consult_ricket',          'RicketConsultsController');
      // Route::resource('patient',                 'PatientsController');
      // Route::resource('picture',                 'PicturesController');
      // Route::resource('payment',                 'PaymentsController');
      // Route::resource('surgery',                 'SurgeriesController');
    });

    // New routes
    CRSecurity::ifHasPersmission('folder.unlock', function() {
      Route::put('appointment/unlock/{id}',      'AppointmentsController@unlock');
      Route::put('bill/unlock/{id}',             'BillsController@unlock');
      Route::put('consult_clubfoot/unlock/{id}', 'ClubFeetController@unlock');
      Route::put('consult_other/unlock/{id}',    'OtherConsultsController@unlock');
      Route::put('payment/unlock/{id}',          'PaymentsController@unlock');
      Route::put('picture/unlock/{id}',          'PicturesController@unlock');
      Route::put('consult_ricket/unlock/{id}',   'RicketConsultsController@unlock');
      Route::put('surgery/unlock/{id}',          'SurgeriesController@unlock');
    });
  });

  CRSecurity::ifHasPersmission('price.edit', function() {
    Route::resource('admin/prices',      'PricesController');
  });
});
