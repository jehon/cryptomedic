<?php

/*
|--------------------------------------------------------------------------
| Register The Composer Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so that we do not have to worry about the
| loading of any our classes "manually". Feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';

global $myconfig;

date_default_timezone_set("GMT");

require_once(__DIR__ . '/../../../../../config.php');

define('MY_FOLDER_TMP',  __DIR__ . '/../../storage/framework/cache/');

var_dump(constant('MY_FOLDER_TMP'));
