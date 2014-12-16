<table class='reporting'><tbody>
<?php

function _addLine($data) {
	if (!is_array($data))
		$data = func_get_args();
	echo "<tr>";
	if (count($data) == 1) {
		echo "<td colspan=2 class='subheader'>" . $data[0] . "</td>";
	} else {
		foreach($data as $v) {
			echo "<td>$v</td>";
		}
	}
	echo "</tr>\n";
	if (count($data) > 1)
		return $data[1];
}

$input = $request->getParameter('month');
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
billsByPathology("Club Foots", "pathology_Clubfoot");

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
	_addLine("ratio (mean)", round($inco / $nbhous));
else
	_addLine("ratio (mean)", "-");

function billsBySocialLevel($sl) {
	global $thismonth;
	global $server;

	return _addLine("Social Level $sl", 
		$server->getDatabase()->queryOneCell("SELECT Count(*) FROM bills WHERE SocialLevel = $sl and $thismonth"));
}

$allSL = 0;
for($i = 0; $i < 5;  $i++)
	$allSL += billsBySocialLevel($i);
_addLine("All social level together", $allSL);

_addLine("Where");
$centers = References::$amd_listing['Centers'];
$centers[] = '';
unset($centers['labels']);

$res = $server->getDatabase()->query("SELECT Center, Count(*) as `count` FROM bills WHERE $thismonth GROUP BY Center");

foreach($centers as $c) {
	_addLine("@ " . References::unreference($c),
		array_key_exists($c, $res) ? $res[$c]['count'] : 0
		);
}

function billCountByType($filter, &$list) {
	global $server;
	global $thismonth;
	global $bills;
	foreach($bills->getColumns() as $f) {
		if ($list == "") $list = "(1=0)";
		if (strtoupper(substr($f, 0, strlen($filter))) == strtoupper($filter)) {
			$sql = "SELECT count(*) From bills WHERE $thismonth AND ($f > 0)";
			_addLine(strtolower($f), $server->getDatabase()->queryOneCell($sql));
			$list .= "OR($f>0)";	
		}
	}
}

_addLine("Consult Activity");
$bills = $server->getDatabase()->getTable("bills");
$anyConsult = "";
billCountByType(Bill::CAT_CONSULT, $anyConsult);

_addLine("Medical Activity");
$bills = $server->getDatabase()->getTable("bills");
$anyMedical = "";
billCountByType(Bill::CAT_MEDECINE, $anyMedical);

_addLine("Workshop Activity");
$anyWorkshop = "";
billCountByType(Bill::CAT_WORKSHOP, $anyWorkshop);

_addLine("Surgical activity");
$anySurgery = "";
billCountByType(Bill::CAT_SURGICAL, $anySurgery);

_addLine("Other activity");
$anyOther = "";
billCountByType(Bill::CAT_OTHER, $anyOther);

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
billStats("Medical (exl. above)", "NOT($anySurgery) AND ($anyMedical)");
billStats("Workshop (exl. above)", "NOT($anyMedical OR $anySurgery) AND ($anyWorkshop)");
billStats("Consults (exl. above)", "NOT($anyMedical OR $anySurgery OR $anyWorkshop) AND $anyConsult");
billStats("Others (exl. above)", "NOT($anyMedical OR $anySurgery OR $anyWorkshop OR $anyConsult) AND $anyOther");

billStats("Grand Total", "(1=1)");
 
?>
</tbody></table>
<?
	$response->ok();
