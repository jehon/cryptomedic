<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;

class StructureController extends Controller {
    static public function cron() {
        $res = "";
        $res .= "<h3>Removing too old browser_features</h3>";
        $n = DB::delete("
            DELETE FROM browser_features
            WHERE updated_at < curdate() - interval 6 month
            ");
        $res .= "$n lines removed";
        
        $res .= "<h3>Removing too old browser_login</h3>";
        $n = DB::delete("
            DELETE FROM browser_login
            WHERE updated_at < curdate() - interval 6 month
            ");
        $res .= "$n lines removed";

        return $res;
    }
}
