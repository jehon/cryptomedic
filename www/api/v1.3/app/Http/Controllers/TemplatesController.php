<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use App\Model\References;

require_once(__DIR__ . "/templates-t.php");

define('TEMPLATE_ROOT', __DIR__ . "/../../../../../templates/templates");

class TemplatesController extends Controller {
  public function render($category, $name = false) {
    // if     return (substr($haystack, -$length) === $needle);
    \t::setPDO(\DB::connection()->getPdo());
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
