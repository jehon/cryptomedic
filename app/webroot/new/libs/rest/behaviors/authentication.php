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
		session_unset();
		$response->ok("Logged out");
		$response->fire();
		die();
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

		// data is not null, thus this route is marked as "handled" and will not throw an "404"
		$response->data = array();
		if ($request->getPost("redirect", false)) {
			echo "<html>";
			echo "<a href='{$request->getPost('redirect', false)}'>continue</a>";
			die();
		}
	}

	if (!$server->getSession(Server::LOGIN_USERNAME, false)) {
		// Test for public pages: none actually
		if (!$request->matchRoute(array("labels"))) {
			?>
				You are not authorized to view this page.<br>
				<form method="POST" action="<? echo $server->getRestServerRoot() . "/" . $server->getConfig(Server::ROUTE_AUTHENTICATE); ?>/login">
					username: <input name='username'><br>
					password: <input type='password' name='password'><br>
					<input type='hidden' name='redirect' value="<?php echo $_SERVER['REQUEST_URI']; ?>">
					<button type="submit">Login</button>
				</form>
			<?php
			throw New HttpUnauthorized("Not a public page");
		}
	}
}