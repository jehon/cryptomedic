<?php

if (file_exists(__DIR__ . "/../config.php")) {
  require(__DIR__ . "/../config.php");
} elseif (file_exists(__DIR__ . "/live/config.php")) {
  require(__DIR__ . "/live/config.php");
} else {
  require(__DIR__ . "/../conf/config-dev.php");
}
