<table class='colorize tablesorter'>
	<thead>
		<tr>
			<th>id</th>
			<th>old</th>
			<th>new</th>
			<th>exists</th>
		</tr>
	</thead>
	<?php

// file:///home/jehon/websites/cake1.3/api13.cakephp.org/class/dbo-mysql.html

define("PICTROOT", $_SERVER['DOCUMENT_ROOT'] . "/uploadedPictures/" );

require __DIR__ . "/../../Config/database.php";
$db = new DATABASE_CONFIG();
global $server;
$server = mysql_connect($db->default['host'], $db->default['login'], $db->default['password']);
mysql_query("USE " . $db->default['database']);

$result = mysql_query("SELECT * FROM pictures");

$action = false;
if (array_key_exists('action', $_REQUEST) && ($_REQUEST['action'] > 0)) {
	$action = true;
	$max = $_REQUEST['action'];
	echo "<h1>Actionning</h1>";
}

$acted = 0;
while ($data = mysql_fetch_array($result,  MYSQL_ASSOC)) {
	echo "<tr>";
	$ext = strtolower(substr($data['file'], strrpos($data['file'], '.')));
	if (strlen($ext) > 4) $ext = "";
	
	$newname = $data['patient_id'] . "_" . substr($data['Date'], 0, 10) . "_" . $data['id'] . $ext;
	
	echo "<td>" . $data['id'] . "</td>";
	echo "<td>" . $data['file'] . "</td>";
	echo "<td>" . $newname . "</td>";
	echo "<td>";
	if ($newname == $data['file']) {
		echo "ok";		
	} else {
		$f = constant('PICTROOT') . $data['file'];
		if (file_exists($f)) {
			if ($action) {
				echo (rename($f, constant('PICTROOT') . $newname) ? "renamed" : "error");
				mysql_query("UPDATE pictures SET file='" . $newname . "' WHERE id=" . $data['id']);
 			} else {
 				echo "[$acted] to be renamed";
			}
			$acted++;
		} else {
			if ($action) {
				mysql_query("DELETE FROM pictures WHERE id=" . $data['id']);
				echo "removed";
			} else {
				echo "file does not exists";
 			}
 		}
	}
	echo "</td>";
	echo "</tr>\n";
	if ($action && ($acted > $max)) {
		echo "<tr><td>limit reached: $max</a></td></tr>";
		break;
	}
}
?></table>
<div id='limit'>end</div>