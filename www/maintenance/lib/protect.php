<?php

require_once(__DIR__ . "/../../../config.php");

global $myconfig;

if (!$myconfig['security']['key']) {
	die("No security.admin configured");
}

if ($_REQUEST['pwd'] != $myconfig['security']['key']) {
	die("Not allowed");
}
