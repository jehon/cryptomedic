<?php
namespace Jehon\Maintenance\Lib;

require_once(__DIR__ . "/../../../autoload.php");
require_once(__DIR__ . "/getParameter.php");

// Beyond the limits
ini_set('default_socket_timeout', -1);
ini_set('max_execution_time', -1);
ini_set('memory_limit', -1);
ini_set('mysql.connect_timeout', -1);


function stepByStep($stepFn, $sameStep = false) {
  static $step = 0;
  if (!$sameStep) {
    $step++;
  }
  $curStep = getParameter("step", 0);
  $nextStep = $curStep + 1;
  if ($step == $curStep) {
    echo "Executing step #$step";
    $stepFn();
    return true;
  } else {
    echo "Skipping step #$step ";
  }
  echo "<a href='?step=$nextStep'>next($nextStep)</a> ";
  echo "<a href='?step=$step'>this</a> ";

  return false;
}

function stepFollow($stepFn) {
  return stepByStep($stepFn, true);
}
