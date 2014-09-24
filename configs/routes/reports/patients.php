<?php

require_once(__DIR__ . "/../helpers/getFolder.php");
require_once(__DIR__ . "/../../amd_listings.php");
require_once(__DIR__ . "/../helpers/references.php");

if (count($request->getRoute()) == 3) {
	$folder = getFolder($request->getRoute(3));

	$heads = array();
	$data = array();

	$heads[] = "Patient";
	$data[] = array_keys($folder['mainFile']);

	$heads[] = false;
	$data[] = unreferenceArray("Patient", $folder['mainFile']);

	$heads[] = false;
	$data[] = "";
	
	foreach($model2controller as $m => $t) {
		$heads[] = null;
		$data[] = "*** $m ***";
		$present = false;

		foreach($folder['subFiles'] as $f) {
			if ($f['_type'] == $m) {
				if (!$present) {
					$heads[] = $m;
					$data[] = array_keys($f);
					$present = true;
				}
				$heads[] = false; //(array_key_exists('Date', $f) ? $f['Date'] : "NA");
				$data[] = unreferenceArray($m, $f);
			}
		}
		if ($present) {
			$heads[] = false;
			$data[] = "";
		}
	}
	$response->ok($data, $heads);
}
