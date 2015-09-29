<?php ?><h1>List of all templates</h1>
<?php
if (!isset($_SERVER['HTTP_HOST']) || strcasecmp(substr($_SERVER['HTTP_HOST'], 0, 9), "localhost") >= 0) {
	function testOne($f) {
		if (is_dir($f)) {
			$res = true;
			foreach(glob("$f/*") as $i) {
				$res = testOne($i) && $res;
			}	
			return $res;
		}
		$l = "../" . str_replace(".php", ".html", substr($f, 2));
		if (isset($_SERVER['HTTP_HOST'])) {
			echo "<a href='$l'>";
		}
		echo $f;
// 		$res = file_get_contents("http://localhost/cryptomedic/templates/$f");
// 		if ($res === false) {
// 			echo "FAILED";
// 		} else {
// 			echo "ok";
// 		}
		if (isset($_SERVER['HTTP_HOST'])) {
			echo "</a><br>";
		}
		echo "\n";
// 		return $res !== false;
	}

	return testOne(".");
} else {
	echo "Not allowed";
}