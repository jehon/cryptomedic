<?php

if(!isset($_SESSION)) session_start();

// Debug helper functios
require_once("helpers/debug.php");

// Configure the application
require_once("config.php");
require_once("helpers/server.php");
$server = new Server($config);

require_once("helpers/response.php");
$response = new Response($server);

require_once("helpers/database.php");
$database = new Database($server->getConfig("database"), $server, $response);

require_once("helpers/request.php");
$request = new Request($server, $response, $database);

// define security: authentification + authorization
require_once("behaviors/authentification.php");

// redirect to the correct route accordingly


?>
<hr>
<?php
	var_dump($_SESSION);
?>