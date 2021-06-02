<?php

/**
 * This file is the first file that should start the application
 *
 * It should not be included by the Laravel part -> see shared for that.
 */

require_once(__DIR__ . '/shared.php');

use Symfony\Component\ErrorHandler\Debug;

Debug::enable();

date_default_timezone_set("GMT");

global $myconfig;
require_once(__DIR__ . '/../../../../../config.php');
