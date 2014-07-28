<?php

/**
 * Default configuration
 */
$config = array(
		"debug" => false,
		"domain" => "domain",
		"database" => array(
				"uri" => "mysqli://user:pwd@server/db?persist",
				"init" => "SET CHARACTER SET 'utf8'"
			),
		"publicURL" => array(),
		"appRoot" => __DIR__ . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR
	);

if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . "../../../../maintenance.php"))
	require_once(__DIR__ . DIRECTORY_SEPARATOR . "../../../../maintenance.php");

$config['database']['uri'] = "mysqli://{$config['database']['login']}:{$config['database']['password']}"
	. "@{$config['database']['host']}/{$config['database']['schema']}";
$config['database']['init'] = "SET CHARACTER SET 'utf8'";

$config['debug'] = ($config['cryptomedic']['debug_level'] > 0);
$config['authentification.salt'] = $config['cryptomedic']['salt'];
$config['authenticate.loginRequest'] = 'SELECT users.username as login, users.group as `group` FROM users '
	. ' WHERE username = ? and password = SHA1(concat("' .  $config["cryptomedic"]["salt"] . '", ?))';
