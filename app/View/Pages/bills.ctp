<H1>Tracking changes in prices</H1>
<?
require __DIR__ . "/../../Config/database.php";
$db = new DATABASE_CONFIG();
global $server;
$server = mysql_connect($db->default['host'], $db->default['login'], $db->default['password']);
mysql_query("USE " . $db->default['database']);

function getList($sql) {
	$list = array();
	$subresult = mysql_query($sql);
	while ($sub = mysql_fetch_array($subresult, MYSQL_ASSOC)) {
		$list[] = $sub['id'] . "[" . $sub['datefrom'] . " > " . $sub['dateto'] . "]";
	}
	return $list;
}

echo "<h1>Checking price ranges</h1>\n";
$conflicts = 0;
$list = getList("SELECT * FROM prices WHERE datefrom is null");
if (count($list) != 1) {
	echo "Exactly one price must have no starting date:<br>\n";
	foreach($list as $l) {
		echo "$l has no starting date.<br>\n";
		$conflicts++;
	}
	echo "FATAL ERROR";
	return ;
}

$list = getList("SELECT * FROM prices WHERE dateto is null");
if (count($list) != 1) {
	echo "Exactly one price must have no ending date:<br>\n";
	foreach($list as $l) {
		echo "$l has no ending date.<br>\n";
		$conflicts++;
	}
	echo "FATAL ERROR";
	return ;
}

$result = mysql_query("SELECT * FROM prices ORDER BY datefrom ASC");
while ($data = mysql_fetch_array($result,  MYSQL_ASSOC)) {
	$me = $data['id'] . "[" . $data['datefrom'] . " > " . $data['dateto'] . "]";
	if (($data['datefrom'] == null) && ($data['dateto'] == null)) {
		echo $me . " has no 'from' and no 'to' date, which is forbidden !<br>\n";
		echo "FATAL ERROR";
		return ;
	}
	// Checking for conflicts
	foreach(getList("SELECT * FROM prices WHERE (id != " . $data['id'] . ") AND " 
				. ($data['datefrom'] != null ? "(dateto > '" . $data['datefrom'] . "')" : "(1=1)")
				. " AND "
				. ($data['dateto'] != null ? "(datefrom < '" . $data['dateto'] . "')" : "(2=2)")
			) as $l) {
		
		echo "$me is in conflict with $l <br>\n";
		$conflicts++;
	}
	if ($data['datefrom'] != null) {
		// Do we have someone just before?
		$list = getList("SELECT * FROM prices WHERE dateto = '" . $data['datefrom'] . "'");
		if (count($list) < 1) {
			echo "$me is not preceeded by nobody<br>\n";
			$conflicts++;
		}
	}
	if ($data['dateto'] != null) {
		// Do we have someone just after?
		$list = getList("SELECT * FROM prices WHERE datefrom = '" . $data['dateto'] . "'");
		if (count($list) < 1) {
			echo "$me is not followed by nobody<br>\n";
			$conflicts++;
		}
	}
	echo "<br>\n";
}
if ($conflicts > 0) {
	echo "Could not go further, since there are conflicts";
	return ;
}
echo "ok<br>\n";
echo "<h1>Updating prices</h1>";

$prices = array();
$result = mysql_query("SELECT * FROM prices ORDER BY datefrom ASC");
while ($data = mysql_fetch_array($result,  MYSQL_ASSOC)) {
	$prices[$data['id']] = $data;
}

/***
 * Fix the prices
 */
Class AppModel{};

require_once("../Model/Bill.php");

$bill = mysql_query("SELECT prices.id as targetprice, bills.* FROM bills "
		. " JOIN prices ON ("
			. " ((prices.datefrom is null) OR (prices.datefrom <= bills.Date)) "
			. " AND "
			. " ((prices.dateto is null) OR (prices.dateto > bills.Date)) "
		.") "
// 		. "WHERE prices.id <> bills.price_id " 
		. "ORDER BY bills.id "
// 		. "LIMIT 10"
		);
echo "<table class='colorize'>";

echo "<tr>";
echo "<td>go</td>";
echo "<td>correct price id</td>";
echo "<td>price from</td>";
echo "<td>price to</td>";
echo "<td>bill id</td>";
echo "<td>bill date</td>";
echo "<td>bill current price</td>";
echo "<td>done</td>";
echo "</tr>";
		
while ($data = mysql_fetch_array($bill,  MYSQL_ASSOC)) {
	echo "<tr>";
	echo "<td><a href='http://localhost/amd/patients/view/" . $data['patient_id'] . "#related/Bill-" . $data['id'] . "/read'>go</a></td>";
	echo "<td>" . $data['targetprice'] . "</td>";
	echo "<td>" . $prices[$data['targetprice']]['datefrom'] . "</td>";
	echo "<td>" . $prices[$data['targetprice']]['dateto'] . "</td>";
	echo "<td>" . $data['id'] . "</td>";
	echo "<td>" . $data['Date'] . "</td>";
	echo "<td>" . $data['price_id'] . "</td>";
	echo "<td>";
		$data['price_id'] = $data['targetprice'];
		unset($data['targetprice']);
// 		$data = Bill::calculateTotal($data, null);
		$data = Bill::calculateTotal($data, $prices[$data['price_id']]);
		if (mysql_query("UPDATE bills SET "
				. "total_real = " . $data['total_real'] . ", "
				. "total_asked = " . $data['total_asked'] . ", "
				. "price_id = " . $data['price_id'] . " WHERE id = " . $data['id']
		)) {
			echo "ok: " . mysql_affected_rows();
		} else {
			echo "error: " . mysql_errno();			
		}
	echo "</td>";
	echo "</tr>";
}
echo "</table>";
