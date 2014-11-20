<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../../amd_listings.php");
require_once(__DIR__ . "/../helpers/references.php");

if (!$request->routeIsEnded()) {
	$folder = getFolder($request->routeGetNext());

	$heads = array();
	$data = array();

	$heads[] = "subheader";
	$data[] = array_keys($folder['mainFile']);

	$heads[] = false;
	$data[] = References::unreferenceObject("Patient", $folder['mainFile']);

	$heads[] = false;
	$data[] = "";
	
	foreach(References::$model2db as $m => $t) {
		$present = false;
		$heads[] = "subheader";
		$data[] = "*** $m ***";

		foreach($folder['subFiles'] as $f) {
			if ($f['_type'] == $m) {
				if (!$present) {

					$heads[] = "subheader";
					$data[] = array_keys($f);

					$present = true;
				}
				$heads[] = false;
				$data[] = References::unreferenceObject($m, $f);
			}
		}
		$heads[] = false;
		$data[] = "";
	}
	$response->ok($data, $heads);
}
