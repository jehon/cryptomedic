<?php
{
	$database = new DBTable($server->getConfig("database"), null, $server, $response);

	if ($request->matchRoute(array("users", "logout"))) {
		$response->debugHeader($server->getSession(Server::LOGIN_USERNAME), "AUTH-OLDUSER");
		$server->setSession(Server::LOGIN_USERNAME, null);
		$response->ok("Logged out");
	}

	// Login route: log in the user if possible
	if ($request->matchRoute(array("users", "login"))) {
		$username = $request->getPost("username", false);
		$password = $request->getPost("password", false);
		// $pwd = $server->getConfig("authentification.salt") . $pwd;
		// $pwd = sha1($server->getConfig("authentification.salt") . $pwd);

		if (!$username) $response->invalidData("username");
		if (!$password) $response->invalidData("password");

		$res = $database->preparedStatement($server->getConfig('authenticate.loginRequest'), array($username, $password));
		if ($res === false || (count($res) != 1))
			$response->invalidData("Bad password");

		$user = $res[0];

		$server->setSession(Server::LOGIN_USERNAME, $user['login']);
		$server->setSession("login.group", $user['group']);
		$response->debugHeader($user['login'], "AUTH-USERNAME");
		$response->debugHeader($user['group'], "AUTH-GROUP");

		// TODO: insert some informations here
		$response->ok();
	}

	if (!$server->getSession(Server::LOGIN_USERNAME, false)) {
		// Test for public pages: none actually
		trace("public");
		$response->unauthorized("");
	}
}