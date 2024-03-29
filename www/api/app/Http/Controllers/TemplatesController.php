<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

require_once(__DIR__ . "/templates-t.php");

define('TEMPLATE_ROOT', __DIR__ . "/../../../../templates/templates");

class TemplatesController extends Controller {
  public function render($category, $name = false) {
    $file = constant('TEMPLATE_ROOT') . '/' . $category . ($name ? '/' . $name : '');

    if (file_exists($file . ".html")) {
      require_once($file . ".html");
    } elseif (file_exists($file . ".php")) {
      require_once($file . ".php");
    } else {
      abort(404, "$category/$name not found: $file");
    }
  }
}
