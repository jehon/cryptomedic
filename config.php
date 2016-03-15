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

// function getGlobalConfig($key) {
// 	global $cli;
// 	if (function_exists("getSecret")) {
// 		$res = getSecret($key, false);
// 		if ($res !== null) {
// 			return $res;
// 		}
// 	}

	// switch ($key) {
	// 	case 'debug':
	// 		global $localhost;
	// 		return $localhost;
		// case 'laravelRandomString':
		// 	return "123";
		// case 'databaseName':
			// return "amd_chakaria";
		// case 'databaseUsername':
			// return "travis";
		// case 'databasePassword':
			// return "";
		// case 'github.token':
			// return "";
		// case 'maintenance.token':
		// case 'maintenance.code':
			// if ($cli) {
				// return "ok";
			// }
	// }
	// if ($cli) {
	// 	return "";
	// }
	// throw new Exception("GlobalConfig not configured: $key");
// }

// global $myconfig;

// $myconfig['database'] = array(
// 		'database' => "mysql:host=" . $myconfig['database']['host'] . ";dbname=" . $myconfig['database']['schema'],
// 		'username' => $myconfig['database']['username'],
// 		'password' => $myconfig['database']['password'],
	// 'options' => [ PDO::MYSQL_ATTR_INIT_COMMAND  => "SET CHARACTER SET 'utf8'" ],//; SET time_zone = '+00:00'" ],
		// 'patches' => array()
// );

// $myconfig['github'] = [
// 	"token" => getGlobalConfig('github.token')
// ];
