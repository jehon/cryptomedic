<?php

/* Include secrets */
require_once(dirname(__DIR__) . DIRECTORY_SEPARATOR . "secrets.php");

if (!isset($config) || !is_array($config)) {
	$config = array();
}
//if (!array_key_exists('deploy', $config)) $config['deploy'] = array();
// if (!array_key_exists('settings', $config)) $config['settings'] = array();
//if (!array_key_exists('disabled', $config)) $config['disabled'] = array();

$config['appRoot'] = __DIR__;
$config['debug'] = false;
$config['domain'] = 'cryptomedic';

$config['database'] = array(
	'pdo_host' => 'localhost',
	'pdo_schema' => 'amd_chakaria',
    'pdo_username' => 'amd_chakaria',
    'pdo_password' => getSecret("databasePassword"),
    'init' => "SET CHARACTER SET 'utf8'",
);

//$config['proxy'] = false;

// Upload
$config['pictures.storage'] = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploadedPictures';
$config['pictures.url'] = '/uploadedPictures';

/* Include the various modules */
//include(__DIR__ . DIRECTORY_SEPARATOR . "autodeploy.php");
//include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "rest" . DIRECTORY_SEPARATOR . "autodeploy.php");

$config['authenticate.loginRequest'] = 'SELECT users.username as login, users.group as `group`, users.id as id FROM users '
    . ' WHERE username = :username and password = SHA1(concat("' .  getSecret('authenticateSalt') . '", :password))';
$config['authenticate.updatePasswordRequest'] = 'UPDATE users SET password = SHA1(concat("'.getSecret('authenticateSalt') .'", :password)) WHERE id = :id';
$config['authenticate.disablePasswordRequest'] = 'UPDATE users SET password = "[disabled password]" WHERE id = :id';

/* Include dev specific items (from above dir) */
if (file_exists(dirname(__DIR__) . DIRECTORY_SEPARATOR . "dev.php"))
	include(dirname(__DIR__) . DIRECTORY_SEPARATOR . "dev.php");

$config['debug'] = 1;

// Application autoload classes
// spl_autoload_register(function ($class) {
//     if (requireIfExists(__DIR__ . "/php/" . strtolower($class) . ".php")) {
//         return true;
//     }
//     return false;
// });

$config['tempDir'] = __DIR__ . "/tmp";
