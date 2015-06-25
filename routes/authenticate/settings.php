<?php

$data = array();
$data['username'] = $server->getSession(Server::LOGIN_USERNAME);
$data['group'] = $server->getSession(Server::LOGIN_GROUP);
// $data["maxUploadSizeMb"] = min(
// 	(int) ini_get('upload_max_filesize'), 
// 	(int) (ini_get('post_max_size') * 0.90), 
// 	(int) (ini_get('memory_limit') * 0.5)
// );
$data["denied"] = array();

// TODO LOW SECURITY: change the authorized list? Link it to real security?
if (isAuthorized("folder", "PUT"))
	$data ['authorized'] [] = "folder.edit";
if (isAuthorized("folder", "DELETE"))
	$data ['authorized'] [] = "folder.delete";
if (isAuthorized("folder", "UNLOCK"))
	$data ['authorized'] [] = "folder.unlock";

if ($v = $server->getRequest()->getParameter("version", false)) {
	
	$data['version'] = $v;
}

$prices = $server->getDatabase()->query("SELECT * FROM prices");
$prices2 = array();
foreach($prices as $v) {
	$prices2[$v['id']] = $v;
}
$data['prices'] = $prices2;

$response->ok($data);
