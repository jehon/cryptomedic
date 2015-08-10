<?php
if (!defined("secretFile"))
	define("secretFile", __DIR__ . "/../secrets.php");

function getGlobalConfig($key) {
	$localhost = $_SERVER && array_key_exists('HTTP_HOST', $_SERVER) && ($_SERVER['HTTP_HOST'] == "localhost");
	if (file_exists(constant("secretFile"))) {
		// In phpunit testing, some tests would run in separate database?
		require_once(constant("secretFile"));
		if (function_exists("getSecret")) {
			$res = getSecret($key, false);
			if ($res !== null) { 
				return $res; 
			}
		}
	}
	
	switch ($key) {
		case 'logs':
			$logs = [ __DIR__ . "/cryptomedic/rest/storage/logs" ];
			if ($localhost) {
				$logs[] = "/var/log/apache2/";
			} else {
				$logs[] = __DIR__ . "/../logs/";
			}
			return $logs;
		case 'debug':
			if (!is_array($_SERVER)) {
				return false;
			}
			if (!array_key_exists('HTTP_HOST', $_SERVER)) {
				return false;
			}
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
