<?php
if (!defined("secretFile")) {
	define("secretFile", __DIR__ . "/../secrets.php");
}

if (file_exists(constant("secretFile"))) {
	require_once(constant("secretFile"));	
}

global $localhost;
$localhost = $_SERVER && array_key_exists('HTTP_HOST', $_SERVER) && ($_SERVER['HTTP_HOST'] == "localhost");

global $cli;
$cli = $_SERVER && !array_key_exists('HTTP_HOST', $_SERVER);

function getGlobalConfig($key) {
	if (function_exists("getSecret")) {
		$res = getSecret($key, false);
		if ($res !== null) { 
			return $res; 
		}
	}
	
	switch ($key) {
		case 'debug':
			global $localhost;
			return $localhost;
		case 'laravelRandomString':
			return "123";	
		case 'databaseName':
			return "amd_chakaria";
		case 'databaseUsername':
			return "travis";
		case 'databasePassword':
			return "";
	}
	throw new Exception("GlobalConfig not configured: $key");
}

global $myconfig;
global $maintenance;

$myconfig['database'] = array(
		'database' => "mysql:host=localhost;dbname=amd_chakaria",
		'username' => 'amd_chakaria',
		'password' => getGlobalConfig("databasePassword"),
		'options' => [ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ],
		'patches' => array()
);

if ($localhost || $cli) {
	$myconfig['database']['patches'][] = __DIR__ . "/conf/database_scripts/dev_only/reset.sql";
	$myconfig['database']['patches'][] = "/home/jehon/amd_chakaria.sql";
}
$myconfig['database']['patches'][] = __DIR__ . "/conf/database_scripts";
if ($localhost || $cli) {
	$myconfig['database']['patches'][] = __DIR__ . "/conf/database_scripts/dev_only";
}

$maintenance = $myconfig;

$maintenance["maintenance"]["code"] = getGlobalConfig("maintenance.code");
$maintenance["maintenance"]["token"] = getGlobalConfig("maintenance.token");
$maintenance["maintenance"]["logs"] = getGlobalConfig("logs");
$maintenance["bug"] = array();
$maintenance["bug"]["url_view"] = "http://www.cryptomedic.org/cryptomedic/maintenance/bug_view.php";
$maintenance["bug"]["url_submit"] = "http://www.cryptomedic.org/cryptomedic/maintenance/bub_submit.php";

$maintenance["deploy"] = array();
$maintenance["deploy"]["root"] = __DIR__;
$maintenance["deploy"]["repository"] = array();
$maintenance["deploy"]["repository"]["owner"] = "jehon";
$maintenance["deploy"]["repository"]["project"] = "cryptomedic";
