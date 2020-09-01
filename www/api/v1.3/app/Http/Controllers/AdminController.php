<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AdminController extends Controller {
  public function databaseStructure() {
        // header('Content-Type: application/json');
        echo "<pre>";

        define('PATCH_DB', 1);
        require_once(__DIR__ . '/../../../bare/database-structure.php');
        // response()->json(constant('DATABASE_STRUCTURE'))->setEncodingOptions(JSON_NUMERIC_CHECK);
        print_r(json_encode(constant('DATABASE_STRUCTURE'), JSON_PRETTY_PRINT));
  }
}
