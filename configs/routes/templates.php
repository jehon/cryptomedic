<?php

if (($request->getMethod() == Request::READ) && !$request->routeIsEnded()) {
	$basename = basename($request->routeConsumeNext());
	$file = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "templates" . DIRECTORY_SEPARATOR . $basename .".php";
	debugHeader($file, "X-TEMPLATE-ASKED");
	if (file_exists($file)) {
		include_once($file);
		echo "<div class='debug_infos'>template " . basename($file) . "@" . date("Y-m-d h:M:s") . "</div>";
		$response->ok();
	}
}
