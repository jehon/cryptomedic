<?php

/* Include secrets */
require_once(dirname(__DIR__) . DIRECTORY_SEPARATOR . "secrets.php");

if (!isset($config)) $config = array();
if (!is_array($config)) $config = array();
if (!array_key_exists('deploy', $config)) $config['deploy'] = array();
if (!array_key_exists('settings', $config)) $config['settings'] = array();
if (!array_key_exists('disabled', $config)) $config['disabled'] = array();

//$config['appRoot'] = __DIR__ . '/app/webroot/new/app/';
$config['appRoot'] = __DIR__ . '/app/';
$config['debug'] = false;
$config['domain'] = 'cryptomedic';

$config['database'] = array(
	'service' => 'mysqli', // for cakephp
    'host' => 'localhost', // for cakephp
    'login' => 'amd_chakaria', // for cakephp
    'password' => getSecret('databasePassword'), // for cakephp
    
    'schema' => 'amd_chakaria',	'uri' => "mysqli://amd_chakaria:" . getSecret('databasePassword') . "@localhost/amd_chakaria",
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
//@include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "maintenance" . DIRECTORY_SEPARATOR . "autodeploy.php");

$config['authenticate.loginRequest'] = 'SELECT users.username as login, users.group as `group` FROM users '
    . ' WHERE username = ? and password = SHA1(concat("' .  getSecret('authenticateSalt') . '", ?))';
$config['authenticate.updatePasswordRequest'] = 'UPDATE users SET password = SHA1(concat("'.getSecret('authenticateSalt') .'", ?)) WHERE id = ?';
$config['authenticate.disablePasswordRequest'] = 'UPDATE users SET password = "[disabled password]" WHERE id = ?';

/* Include dev specific items */
if (file_exists(dirname(__DIR__) . DIRECTORY_SEPARATOR . "dev.php"))
	include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "dev.php");
