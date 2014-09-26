<?php

if (count($request->getRoute()) > 1) {
	$report = __DIR__ . "/reports/" . $request->getRoute(2) . ".php";
	if (file_exists($report)) {
		include($report);
	}
}
