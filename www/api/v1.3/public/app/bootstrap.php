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

# https://www.php.net/manual/en/function.set-error-handler.php
// function headerErrorHandler() {
//     http_response_code(500);
//     return false;
// }
// set_error_handler("headerErrorHandler");

require_once(__DIR__ . '/shared.php');

global $myconfig;

date_default_timezone_set("GMT");

require_once(__DIR__ . '/../../../../../config.php');
