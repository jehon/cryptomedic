<?php

if ($request->matchRoute(array($server->getConfig(Server::ROUTE_AUTHENTICATE), "login"))) {
	$data = array();
	$data['username'] = $server->getSession(Server::LOGIN_USERNAME);
	$data['group'] = $server->getSession(Server::LOGIN_GROUP);
	$data["maxUploadSizeMb"] = min(
		(int) ini_get('upload_max_filesize'), 
		(int) (ini_get('post_max_size') * 0.90), 
		(int) (ini_get('memory_limit') * 0.5)
	);
	$data["denied"] = array();

	// TODO: refine denied list -> better an authorize list?
	if (!isAuthorized("folder", "edit"))
		$data ['denied'] [] = "folder.edit";
	// if (!isAuthorized("folder", "DELETE"))
		$data ['denied'] [] = "folder.delete";
	// if (!isAuthorized("folder", "unlock"))
		$data ['denied'] [] = "folder.unlock";

	$response->ok($data);
}