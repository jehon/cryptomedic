<?php

include "settings.php";

$server->getDatabase()->query("UPDATE users SET last_login = NOW() WHERE username = :username", 
		array("username" => $server->getSession(Server::LOGIN_USERNAME))
		);
