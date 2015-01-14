<?php

if (($request->getMethod() == Request::READ) && !$request->routeIsEnded()) {
	// $basename = basename($request->routeConsumeNext());
	$basename = $request->routeGetEnd(); 
	$file = __DIR__ . DIRECTORY_SEPARATOR . ".." . DIRECTORY_SEPARATOR . "templates" . DIRECTORY_SEPARATOR . strtolower($basename) .".php";
	debugHeader($file, "X-TEMPLATE-ASKED");
	if (file_exists($file)) {
		debugHeader($file, "X-TEMPLATE-FOUND");
		include_once($file);
		echo "<div class='debug_infos'>template " . basename($file) . "?mode=" . $request->getParameter("mode", "?") . "@" . date("Y-m-d h:i:s") . "</div>";
		if ($request->getSystemParameter('unused', false)) {
			t::showUnused($request->getSystemParameter('unused'));
			$t = $request->getSystemParameter('unused');
			$m = References::db2model($t);
			foreach(References::$model_listing as $l => $content) {
				if (substr($l, 0, strlen($m)) == $m) {
					$f = substr($l, strlen($m) + 1);
					if (!$server->getDatabase()->getTable($t)->isColumn($f)) {
						var_dump("List without database behind: $f");
					} 
				}
			}
		}
		$response->ok();
	}
}
