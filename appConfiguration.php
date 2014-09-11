<?php

/* Include secrets */
require_once(dirname(__DIR__) . DIRECTORY_SEPARATOR . "secrets.php");

if (!isset($config)) $config = array();
if (!is_array($config)) $config = array();
if (!array_key_exists('deploy', $config)) $config['deploy'] = array();
if (!array_key_exists('settings', $config)) $config['settings'] = array();
if (!array_key_exists('disabled', $config)) $config['disabled'] = array();

$config['appRoot'] = __DIR__ . '/app/webroot/new/app/';
$config['debug'] = false;
$config['disabled'][] = 'restoreDatabaseDev';
$config['domain'] = 'cryptomedic';

$config['database'] = array(
    'service' => 'mysqli',
    'host' => 'localhost',
    'login' => 'amd_chakaria',
    'password' => getSecret('databasePassword'),
    'schema' => 'amd_chakaria',
    'init' => "SET CHARACTER SET 'utf8'",
    'backup_tables' => array( "users", "labels", "patients", "prices" )
);

$config['proxy'] = false;

$config['pictures'] = array();
$config['pictures']['upload'] = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploadedPictures';
$config['pictures']['web'] = '/uploadedPictures';


/* Include the various modules */
@include(__DIR__ . DIRECTORY_SEPARATOR . "autodeploy.php");
@include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "rest" . DIRECTORY_SEPARATOR . "autodeploy.php");
@include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "maintenance" . DIRECTORY_SEPARATOR . "autodeploy.php");


/* Configure dependant variables */
$config['database']['uri'] = "mysqli://{$config['database']['login']}:{$config['database']['password']}"
	. "@{$config['database']['host']}/{$config['database']['schema']}";

$config['authenticate.loginRequest'] = 'SELECT users.username as login, users.group as `group` FROM users '
    . ' WHERE username = ? and password = SHA1(concat("' .  getSecret('authenticateSalt') . '", ?))';
$config['authenticate.updatePasswordRequest'] = 'UPDATE users SET password = SHA1(concat("'.getSecret('authenticateSalt') .'", ?)) WHERE id = ?';
$config['authenticate.disablePasswordRequest'] = 'UPDATE users SET password = "[disabled password]" WHERE id = ?';

/* Include dev specific items */
include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "dev.php");
