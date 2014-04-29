<pre>
<?php 
	function error($msg, $mysqli = null) {
		echo "\n";
		if ($msg != null) {
			if (strlen($msg) > 0) {
				echo "$msg: ";
			}
		}
		if ($mysqli != null) {
			echo "FAILED #" . $mysqli->errno . ":\n" . $mysqli->error . "\n";
		}
		die("** ERROR **\n");
	}

	require(__DIR__ . "/../../../../maintenance.php");
	
	$mysqli = new mysqli($config['database']['host'], 
			$config['database']['login'], 
			$config['database']['password'],
			$config['database']['schema']
		);
	
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	echo "Host infos: " . $mysqli->host_info . "\n";
	
	$res = $mysqli->query("SELECT `value` FROM `settings` WHERE `id` = 'structure_version' ORDER BY `id` ASC");

	if ($res === false) {
		echo "Initializing the database\n";
	} else {
		if ($res->num_rows > 1) {
			error("Too much infos in the database");
		}
		
		$version = $res->fetch_array();
		$version = array_pop($version);

		echo "Current version: $version\n";
		
		foreach(glob(__DIR__ . "/upgrade.sql/*") as $f) {
			$target_v = basename($f, ".sql");
			if ($target_v <= $version) {
				echo "Skipping $f [$target_v]\n";
				continue;
			}
			echo "Treating $f [$target_v]: ";
			$content = file_get_contents($f);
			if (!$mysqli->multi_query($content)) {
				error("Executing the content failed", $mysqli);
			}
			echo "ok\n";
			$res = $mysqli->query("UPDATE `settings` SET `value`= '$target_v' WHERE `id` = 'structure_version' ORDER BY `id` ASC");
		}
	}
