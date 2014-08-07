<?php
if (!defined("REST_LOADED")) die("Ca va pas la tête?");

// Could throw new HttpForbidden();

function isAuthorized($resource, $action, $parameters = array()) {
	global $server;

	$group = $server->getSession(Server::LOGIN_GROUP);

	// Authentification is available for everybody
	if (Server::ROUTE_AUTHENTICATE == $resource) return true;	
	
/*** Admin rights ***/
	// Admin can do everything
	if ('admin' == $group) 	return true;

	// System resources are available to admin only
	if ("system" == $resource) return false;

	// users pages can be accessed by admin only (see above)
	// PS: login and logout are public
	if ('users' == $resource) return false;	
	
/**** Readonly rights ****/
	// everybody can read everything
	if ('GET' == $action) return true;

	// readonly can not do anything else
	if ('readonly' == $group) return false;

/**** Manager rights ****/
	// UNLOCK and DELETE can only be done by manager (admin above)
	if ('UNLOCK' == $action) return ($group == 'manager');
	if ('DELETE' == $action) return ($group == 'manager');

/**** TODO: manage other authorizations ****/
	switch ($action) {
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
	debugHeader($resource . "." . $action, "AUTH-uncatched");
	return true;
}

if (!isAuthorized($request->getRoute(1), $request->getMethod())) {
// if (!isAuthorized($server, $request)) {
	throw new HttpForbidden("Not allowed");
}
