<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use App\References;

define('TEMPLATE_ROOT', __DIR__ . "/../../../../../templates/templates");

class TemplatesController extends Controller {
  public function render($category, $name = false) {
    $file = constant('TEMPLATE_ROOT') . '/' . $category . ($name ? '/' . $name : '') . ".php";
    if (!file_exists($file)) {
      abort(404, "$category/$name not found");
    }
    require_once($file);
  }
}
