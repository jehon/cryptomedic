<?php
date_default_timezone_set("GMT");

require_once(__DIR__ . "/php/references.php");

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
	global $cli;
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
		case 'github.token':
			return "";
		case 'maintenance.token':
		case 'maintenance.code':
			if ($cli) {
				return "ok";
			}
	}
	if ($cli) {
		return "";
	}
	throw new Exception("GlobalConfig not configured: $key");
}

global $myconfig;

$myconfig['database'] = array(
		'database' => "mysql:host=localhost;dbname=amd_chakaria",
		'username' => 'amd_chakaria',
		'password' => getGlobalConfig("databasePassword"),
		'options' => [ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ],//; SET time_zone = '+00:00'" ],
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

$myconfig['github'] = [
	"token" => getGlobalConfig('github.token')
];
