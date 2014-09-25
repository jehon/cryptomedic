<?php

// TODOJH: 1 patient report (use getFolder and put it in form)
// TODOJH: 2 monthlyReport (see ReportsController.php)
// TODOJH: 3 activity (see activity.ctp)

if (count($request->getRoute()) > 1) {
	$report = __DIR__ . "/reports/" . $request->getRoute(2) . ".php";
	if (file_exists($report)) {
		include($report);
	}
}
