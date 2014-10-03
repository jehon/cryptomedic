<?php

if (!$request->routeIsEnded()) {
	$report = __DIR__ . "/reports/" . $request->routeConsumeNext() . ".php";
	if (file_exists($report)) {
		include($report);
	}
}
