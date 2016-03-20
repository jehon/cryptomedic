<?php

namespace App\Http\Controllers\Templates;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

use \References;

class TemplatesController extends Controller {
  public function render($category, $name = '') {
    var_dump($category);
    var_dump($name);
    throw new NotFoundHttpException;
  }
}
