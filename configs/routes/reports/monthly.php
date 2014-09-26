<?php

require_once(__DIR__ . "/../helpers/references.php");

$response->data = array();
$response->parameters = array("month" => array("text" => "Enter the month for the report (yyyy-mm - 2014-01)",
			"default" => date("Y-m")
		)
	);

function _addLine($data) {
	if (!is_array($data))
		$data = func_get_args();
	global $response;
	$response->data[] = $data;
	if (count($data) == 1) {
		$response->descriptiveData[] = "subheader";
	} else {
		$response->descriptiveData[] = array();
	}
	if (count($data) > 1)
		return $data[1];
}

$input = $request->getParameter('month', '2012-01'); // TODOJH: default to : date("Y-m") or month - 1?
$year = substr($input, 0, 4);
$month = substr($input, 5, 2);

/* SQL Buildings blocks */
$thismonth = " (Date BETWEEN '{$year}-{$month}-01' AND '" . date("Y-m-d", mktime(0, 0, 0, $month + 1, 0, $year)) . "')";

_addLine("Requested");
_addLine("year", $year);
_addLine("month", $month);

_addLine("Diagnostic");

function billsByPathology($header, $pathology, $simple = false) {
	global $thismonth;
	global $server;

	$newPatients = " (patients.entryyear >= YEAR(bills.Date)) AND (ADDDATE(patients.created, INTERVAL 1 MONTH) >= bills.Date) ";

	$sql = "SELECT count(*) as c FROM bills JOIN patients ON (bills.patient_id = patients.id)"
		. " WHERE (1=1) AND patients.$pathology > 0 AND {$thismonth}";
	$all = $server->getDatabase()->queryOneCell($sql);
	_addLine($header, $all);

	if ($simple) return 1;

	$sql = "SELECT count(*) as c FROM bills JOIN patients ON (bills.patient_id = patients.id)"
		. " WHERE (1=1) AND patients.$pathology > 0 AND {$thismonth} AND $newPatients";
	$newone = $server->getDatabase()->queryOneCell($sql);
	_addLine($header . " (new only)", $newone);
	_addLine($header . " (old only)", $all - $newone);
	return 1;
}

billsByPathology("Ricket consults", "pathology_Ricket");
billsByPathology("Club FootsRicket consults", "pathology_Clubfoot");

billsByPathology("Polio", "pathology_Polio", true);
billsByPathology("Burn", "pathology_Burn", true);
billsByPathology("CP", "pathology_CP", true);
billsByPathology("Congenital", "pathology_Congenital", true);
billsByPathology("Adult", "pathology_Adult", true);
billsByPathology("Other", "pathology_other", true);

_addLine("Social Level");
$res = $server->getDatabase()->query(
		"SELECT CAST(SUM(patients.Familysalaryinamonth) / COUNT(*) AS DECIMAL) as income, 
			SUM(patients.Numberofhouseholdmembers) / COUNT(*) nbhous 
			FROM bills JOIN patients ON (bills.patient_id = patients.id)
			WHERE $thismonth"
	);
$res = array_pop($res);

$inco = $res['income'];
$nbhous = $res['nbhous'];
_addLine("Family income (mean)", $inco);
_addLine("Nb household mb (mean)", $nbhous);

if ($nbhous > 0)
	_addLine("ratio (mean)", $inco / $nbhous);
else
	_addLine("ratio (mean)", "-");

function billsBySocialLevel($sl) {
	global $thismonth;
	global $server;

	_addLine("Social Level $sl", 
		$server->getDatabase()->queryOneCell("SELECT Count(*) FROM bills WHERE SocialLevel = $sl and $thismonth"));
}

for($i = 0; $i < 6;  $i++)
	billsBySocialLevel($i);

_addLine("Where");
$centers = $amd_listing['Centers'];
$centers[] = '';
unset($centers['labels']);

$res = $server->getDatabase()->query("SELECT Center, Count(*) as `count` FROM bills WHERE $thismonth GROUP BY Center", "Center");

foreach($centers as $c) {
	_addLine("@ " . unreference("Bill", "Center", $c),
		array_key_exists($c, $res) ? $res[$c]['count'] : 0
		);
}

function billCountByType($filter, &$list) {
	global $server;
	global $thismonth;
	global $bills;
	foreach($bills->getColumns() as $f => $k) {
		if ($list == "") $list = "(1=0)";
		if (strtoupper(substr($f, 0, strlen($filter))) == strtoupper($filter)) {
			$sql = "SELECT count(*) From Bills WHERE $thismonth AND ($f > 0)";
			_addLine(strtolower($f), $server->getDatabase()->queryOneCell($sql));
			$list .= "OR($f>0)";	
		}
	}
}

_addLine("Consult Activity");
$bills = $server->getDatabase()->getTable("bills");
$anyConsult = "";
billCountByType("CONSULT_", $anyConsult);

_addLine("Workshop Activity");
$anyWorkshop = "";
billCountByType("WORKSHOP_", $anyWorkshop);

_addLine("Surgical activity");
$anySurgery = "";
billCountByType("SURGICAL_", $anySurgery);

_addLine("Other activity");
$anyOther = "";
billCountByType("OTHER_", $anyOther);

function billStats($header, $filter) {
	global $server;
	global $thismonth;
	_addLine($header);

	$sql = "SELECT SUM(total_real) AS total_real,
		SUM(total_asked) as total_asked,
		SUM(total_paid) as total_paid
		FROM bills 
		WHERE $thismonth AND ($filter)";

	$stats = $server->getDatabase()->query($sql);
	$stats = array_pop($stats);
	_addLine("total_real", $stats['total_real']);
	_addLine("total_asked", $stats['total_asked']);
	_addLine("total_paid", $stats['total_paid']);
	if ($stats['total_real'] > 0)
		_addLine("total paid / total real", $stats['total_paid'] / $stats['total_real']);
	else
		_addLine("total paid / total real", "-");
	_addLine("");
}

_addLine("Financials");
billStats("Surgery", $anySurgery);
billStats("Workshop (exl. surgeries)", "NOT($anySurgery) AND ($anyWorkshop)");
billStats("Consults (ex. surgeries and workshops)", "NOT($anySurgery OR $anyWorkshop) AND $anyConsult");
billStats("Others", "NOT($anySurgery OR $anyWorkshop OR $anyConsult) AND $anyOther");

billStats("Grand Total", "(1=1)");
 