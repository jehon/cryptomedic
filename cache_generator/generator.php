<?php
$generator = array();

require_once(dirname(__DIR__) . DIRECTORY_SEPARATOR . "globalConfig.php");

$generator['database'] = array(
		'pdo_host' => 'localhost',
		'pdo_schema' => getGlobalConfig("databaseName"),
		'pdo_username' => getGlobalConfig("databaseUsername"),
		'pdo_password' => getGlobalConfig("databasePassword"),
		'init' => "SET CHARACTER SET 'utf8'",
);

$generator['target'] = $_REQUEST['target'];
$generator['path'] = explode("/", $generator['target']);
$generator['runtime'] = pathinfo($generator['path'][0], PATHINFO_FILENAME) . ".php";
$generator['dest'] = __DIR__ . "/../cache/" . $generator['target'];

foreach($generator['path'] as $p) {
	if ($p == "..") {
		die("I say: invalid request");
	}
}
if (!file_exists($generator['runtime'])) {
	die("Generator not found");
}

// TODO CHECK: If we had some parameters, do not save it to file?

try {
	ob_start();
	
	include($generator['runtime']);

	umask(02);

	// create path if necessary - wrong permissions!
	if (!file_exists(dirname($generator['dest']))) {
		mkdir(dirname($generator['dest']), 0775, true);
	}
	
	$generator['fdest'] = fopen($generator['dest'], "w");
	ftruncate($generator['fdest'], 0);
	fwrite($generator['fdest'], ob_get_contents());
	fflush($generator['fdest']);
	fclose($generator['fdest']);
	ob_end_flush();
	
} catch (Exception $e) {
	echo "Error received - not caching the file";
	var_dump($e);
}
