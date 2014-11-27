<?php

if (($request->getMethod() == Request::READ) && !$request->routeIsEnded()) {
	// $basename = basename($request->routeConsumeNext());
	$basename = $request->routeGetEnd(); 
	$file = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "templates" . DIRECTORY_SEPARATOR . strtolower($basename) .".php";
	debugHeader($file, "X-TEMPLATE-ASKED");
	if (file_exists($file)) {
		debugHeader($file, "X-TEMPLATE-FOUND");
		include_once($file);
		echo "<div class='debug_infos'>template " . basename($file) . "?mode=" . $request->getParameter("mode", "?") . "@" . date("Y-m-d h:M:s") . "</div>";
		if ($request->getSystemParameter('unused', false)) {
			t::showUnused($request->getSystemParameter('unused'));
		}
		$response->ok();
	}
}
