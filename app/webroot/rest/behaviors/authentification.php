<?php

// Login route: log in the user if possible
if ($request->matchRoute(array("users", "login"))) {
	$user = $request->getPost("username", false);
	$pwd = $request->getPost("password", false);
	// $pwd = $server->getConfig("authentification.salt") . $pwd;
	// $pwd = sha1($server->getConfig("authentification.salt") . $pwd);

	if (!$user) $response->invalidData("username");
	if (!$pwd) $response->invalidData("password");

	$res = $database->preparedStatement($server->getConfig('authenticate.loginRequest'), array($user, $pwd));
	if ($res === false || (count($res) != 1))
		$response->invalidData("Bad password");

	$login = $res[0];
	$server->setSession("login.username", $login['login']);
	$server->setSession("login.group", $login['group']);
}

$response->debugHeader($server->getSession('login.username', '-not logged in-'), "LOGIN");
if (!$server->getSession('login.username', false)) {
	trace("public");
} else {
	trace("private");
	if ($request->matchRoute(array("users", "logout"))) {
		$server->setSession('login.username', null);
		$server->setSession('login.group', null);
		$response->ok();
	}
}

function login($request) {
	// Reset the domain: a login attempt is also a logout
	$_SESSION[$this->domain] = array();
	$_SESSION[$this->domain]['test'] = "test";

	$login = $this->server->getParameter('login', $request);
	$password = $this->server->getParameter('password', $request);

	$stmt = $this->server->db->Prepare($this->server->getConfig('LoginRequest'));
	$res = $this->server->db->Execute($stmt, array($login, $password));
	if (!$res || ($res->RecordCount() != 1))
	$this->server->criticalError("Bad password", 403);

	$_SESSION[$this->domain]['login'] = $login;

	return $res->RecordCount();
}

function logout() {
	$_SESSION[$this->domain] = array();
	$response->criticalError("Logged out", 401);
	return false;
}

function ping() {
	$login = $this->isAuthorized(array());
	return array('ping' => $login);
}
