<?php
namespace Jehon\Maintenance;

class TryCatch {
  static public function run() {
    register_shutdown_function('Jehon\Maintenance\TryCatch::shutdown');
  }

  static public function shutdown() {
    $error = error_get_last();
    if ($error === null) {
      if (\Jehon\Maintenance\Lib\getParameter("quiet", false)) {
        return;
      }

      echo "<hr>";
      echo "Terminated ok.";
      echo "\n";
      return;
    }

    if (!headers_sent()) {
      http_response_code(500);
    }

    echo "<hr>";
    echo "<pre>";
    echo $error['message'];
    echo "\n";
    if (method_exists($error, 'getTraceAsString')) {
      echo $error->getTraceAsString();
    }
  }
}
