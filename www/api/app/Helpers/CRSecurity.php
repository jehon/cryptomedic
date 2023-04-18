<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;

class CRSecurity {
    static function ifHasPersmission($permission, $fn) {
        return Route::group([ 'middleware' => 'hasPermission:' . $permission ], $fn);
    }
}
