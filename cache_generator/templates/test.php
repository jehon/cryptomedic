<?php
	if (strcasecmp(substr($_SERVER['HTTP_HOST'], 0, 9), "localhost") != 0) {
		die("Not allowed");
	}

	function testOne($f) {
		if (is_dir($f)) {
			$res = true;
			foreach(glob("$f/*") as $i) {
				$res = testOne($i) && $res;
			}	
			return $res;
		}
		echo "$f: ";
		$res = file_get_contents("http://localhost/cryptomedic/templates/$f");
		if ($res === false) {
			echo "FAILED";
		} else {
			echo "ok";
		}
		if (isset($_SERVER['HTTP_HOST'])) {
			echo "<br>";
		}
		echo "\n";
		return $res !== false;
	}

	return testOne(".");
	