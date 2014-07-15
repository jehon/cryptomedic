<?php
if (!defined("REST_LOADED")) die("Ca va pas la tête?");

function isAuthorized($server, $request) {
	$resource = $request->getRoute(1);
	$action = $request->getMethod();
	
	$group = $server->getSession(Server::LOGIN_GROUP);
	// pr(array('group' => $group, 'resource' => $resource, 'action' => $action, 'args' => $args));
	
	// Admin can do everything
	if ('admin' == $group) 	return true;

	// users pages can be accessed by admin only (see above)
	// PS: login and logout are public
	if ('users' == $resource) return false;
	
	// All can read everything
	if ('GET' == $action) return true;

	switch ($action) {
		case "unlock" :
		case "delete" :
			if ("manager" == $group)
				return true;
			return false;
			break;
		case "reference" :
		case "add" :
		case "edit" :
			if ("readonly" == $group)
				return false;
			return true;
			break;
		case "structure" :
		case "calculate" :
		case "view" :
		case "folder":
		case "index" :
			return true;
			break;
	}
	pr("AUTH: uncatched action: " . $action);
	return true;
}

if (!isAuthorized($server, $request)) {
	$response->forbidden();
}
