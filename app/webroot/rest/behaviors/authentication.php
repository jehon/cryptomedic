<?php
// Could throw New HttpUnauthorized("Not a public page"); if auth is required
// Could throw New HttpInvalidData(); if credentials are incorrects

if (!defined("REST_LOADED")) die("Ca va pas la tête?");
{
	$database = new DBTable($server->getConfig("database"), null, $server);

	if ($request->matchRoute(array($server->getConfig(Server::ROUTE_AUTHENTICATE), "logout"))) {
		debugHeader($server->getSession(Server::LOGIN_USERNAME), "AUTH-OLDUSER");
		$server->setSession(Server::LOGIN_USERNAME, null);
		$server->setSession(Server::LOGIN_GROUP, null);
		$response->ok("Logged out");
	}

	// Login route: log in the user if possible
	if ($request->matchRoute(array($server->getConfig(Server::ROUTE_AUTHENTICATE), "login"))) {
		$username = $request->getPost("username", false);
		$password = $request->getPost("password", false);
		// $pwd = $server->getConfig("authentification.salt") . $pwd;
		// $pwd = sha1($server->getConfig("authentification.salt") . $pwd);

		if (!$username) throw New HttpInvalidData("username");
		if (!$password) throw New HttpInvalidData("password");

		$res = $database->preparedStatement($server->getConfig('authenticate.loginRequest'), array($username, $password));
		if ($res === false || (count($res) != 1))
			throw New HttpInvalidData("Invalid credentials");

		$user = $res[0];

		$server->setSession(Server::LOGIN_USERNAME, $user['login']);
		$server->setSession(Server::LOGIN_GROUP, $user['group']);

		// TODO: insert some informations here -> continue?
		$response->setResponse();
	}

	if (!$server->getSession(Server::LOGIN_USERNAME, false)) {
		// Test for public pages: none actually
		trace("public");
		if (!$request->matchRoute(array("labels"))) {
			throw New HttpUnauthorized("Not a public page");
		}
	}
}