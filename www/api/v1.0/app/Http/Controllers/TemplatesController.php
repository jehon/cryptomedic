<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use App\References;

require_once(__DIR__ . "/templates-t.php");

define('TEMPLATE_ROOT', __DIR__ . "/../../../../../templates/templates");

class TemplatesController extends Controller {
  public function render($category, $name = false) {
    // if     return (substr($haystack, -$length) === $needle);
    \t::setPDO(\DB::connection()->getPdo());
    $file = constant('TEMPLATE_ROOT') . '/' . $category . ($name ? '/' . $name : '');
    if (substr($name, -strlen('.php')) != '.php') {
      $file .=  ".php";
    }
    if (!file_exists($file)) {
      abort(404, "$category/$name not found: $file");
    }
    require_once($file);
  }
}
