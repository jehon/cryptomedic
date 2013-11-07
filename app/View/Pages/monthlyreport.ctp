<?php

if (!array_key_exists("month", $this->Html->request->query)) {
	?>
	Please select a month (yyyy-mm, ex: 2013-03):
	<form>
		<input name='month' value='2013-03'>
		<input type='submit' value='submit'>
	</form>
	<?
	die("");
}

$input = $this->Html->request->query['month'];
$year = substr($input, 0, 4);
$month = substr($input, 5, 2);
$this->kdm->reportFileName("monthly-report-$year-$month");

/**
 * Some global variables
 */
global $timecondition, $mbill, $mpatient, $kdm;
$timecondition = array("Date BETWEEN ? AND ?" => array($year . "-" . $month . "-01", date("Y-m-d", mktime(0, 0, 0, $month + 1, 0, $year))));
pr("debug");
$timecondition = array("Date BETWEEN ? AND ?" => array($year . "-" . $month . "-01", date("Y-m-d", mktime(0, 0, 0, $month, 1, $year))));
pr($timecondition);
$mbill = ClassRegistry::init("Bill");
$mpatient = ClassRegistry::init("Patient");
$kdm = $this->kdm;

/**
 * Some helper functions
 */
function resultat($header, $value) {
	global $kdm;
	$kdm->reportLine($header, $value);
	return $value;
}

function getCountBy($header, $model, $conditions) {
	$cmodel = ClassRegistry::init($model);
	$res = $cmodel->find('count', array('conditions' => $conditions));
	return resultat($header, $res);
}

function getBillCountBy($header, $conditions = "") {
	if (!is_array($conditions)) {
		resultat($header, "Not implemented");
		return ;
	} 
	global $timecondition;
	return getCountBy($header, "Bill", array_merge($conditions, $timecondition));
}

function getBillExpressionBy($header, $expression, $conditions = array()) {
	if (!is_array($conditions)) {
		resultat($header, "Not implemented");
		return ;
	}
	global $timecondition;
	global $mbill;
    $cond = array_merge($conditions, $timecondition);
    if ($header == "stats") {
        $res = $mbill->find('all', array('conditions' => $cond));
        ksort($res);
        pr($cond);
        foreach($res as $i => $v) {
            ksort($res[$i]['Bill']);
            pr($res[$i]['Bill']['id']);

        }
    }

	$res = $mbill->find('all', array('conditions' => $cond,
			'fields' => $expression 
		));
	
    if (!is_array($expression)) {
        $res = (float) array_pop($res[0][0]);
        if (floor($res) == $res) $res = (int) $res;
        return resultat($header, $res);
    }
    foreach($res[0][0] as $k => $v) {
        if (floor($v) == $v) $res[0][0][$k] = (int) $v;
    }
    return $res[0][0];
}

function billStats($header, $condition = array()) {
    global $kdm;
    $kdm->reportSubHeader($header);
    $stats = getBillExpressionBy("stats",
        array("SUM(total_real) as total_real", "SUM(total_asked) as total_asked", "SUM(total_paid) as total_paid"),
        $condition);
    resultat("total_real", $stats['total_real']);
    resultat("total_asked", $stats['total_asked']);
    resultat("total_paid", $stats['total_paid']);
    $kdm->reportLine("total paid / total real", $stats['total_paid'] / $stats['total_real']);
    $kdm->reportLine("");
}

/**
 * The report himself
 */
$new = array("AND" => array("Patient.entryyear >= YEAR(Bill.Date)", "ADDDATE(Patient.created, INTERVAL 1 MONTH) >= Bill.Date"));

$this->kdm->reportBegin();
$this->kdm->reportHeader("Requested");
$kdm->reportLine("year", $year);
$kdm->reportLine("month", $month);

$this->kdm->reportHeader("Diagnostic");
getBillCountBy("Ricket consults", array("Patient.pathology_Ricket" => "1"));
getBillCountBy("New Ricket consults", array("Patient.pathology_Ricket" => "1", $new));
getBillCountBy("Old Ricket consults", array("Patient.pathology_Ricket" => "1", "NOT" => $new));
getBillCountBy("Club foots", array("Patient.pathology_Clubfoot" => "1"));
getBillCountBy("New Club foots", array("Patient.pathology_Clubfoot" => "1", $new));
getBillCountBy("Old Club foots", array("Patient.pathology_Clubfoot" => "1", "NOT" => $new));
getBillCountBy("Polio", array("Patient.pathology_Polio" => "1"));
getBillCountBy("Burn", array("Patient.pathology_Burn" => "1"));
getBillCountBy("CP", array("Patient.pathology_CP" => "1"));
getBillCountBy("Congenital", array("Patient.pathology_Congenital" => "1"));
getBillCountBy("Adult", array("Patient.pathology_Adult" => "1"));
getBillCountBy("Other", array("Patient.pathology_other" => "1"));

$this->kdm->reportHeader("Social Level");
$inco = getBillExpressionBy("Family income (mean)", "CAST(SUM(Patient.Familysalaryinamonth) / COUNT(*) AS DECIMAL)");
$nbhous = getBillExpressionBy("Nb household mb (mean)", "SUM(Patient.Numberofhouseholdmembers) / COUNT(*)");
$kdm->reportLine("ratio (mean)", $inco / $nbhous);

$i = 0;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;
getBillCountBy("Social Level $i", array("Bill.SocialLevel" => "$i")); $i++;

$this->kdm->reportHeader("Where");
$centers = $mbill->find('list', array('fields' => array("Center"), "group" => "Center"));
foreach($centers as $c) {
	getBillCountBy($this->kdm->getLabel($c), array("Center" => $c));
}

$this->kdm->reportHeader("Consult Activity");
$anyConsult = array("OR" => array());
foreach($mbill->billFields("consult") as $f) {
	getBillCountBy($f, array("$f >" => 0));
    $anyConsult["OR"][$f . " >"] = "0";
}

$this->kdm->reportHeader("Workshop Activity");
$anyWorkshop = array("OR" => array());
foreach($mbill->billFields("workshop") as $f) {
	getBillCountBy($f, array("$f >" => 0));
    $anyWorkshop["OR"][$f . " >"] = "0";
}

$this->kdm->reportHeader("Surgical activity");
$anySurgery = array("OR" => array());
foreach($mbill->billFields("surgical") as $f) {
	getBillCountBy($f, array("$f >" => 0));
    $anySurgery["OR"][$f . " >"] = "0";
}

$this->kdm->reportHeader("Other activity");
foreach($mbill->billFields("other") as $f) {
	getBillCountBy($f, array("$f >" => 0));
}

$this->kdm->reportHeader("Financials");
billStats("Surgery", $anySurgery);

pr("Workshop (exl. surgeries)");
$onlyWorkshop = array("AND" => array_merge($anyWorkshop, array("NOT" => array_merge_recursive($anySurgery))));
billStats("Workshop", $onlyWorkshop);

pr("Consults (ex. surgeries and workshops");
$onlyConsults = array("AND" => array_merge($anyConsult, array("NOT" => array_merge_recursive($anySurgery, $anyWorkshop))));
billStats("Consults", $onlyConsults);

pr("others");
$onlyOther = array("NOT" => array_merge_recursive($anySurgery, $anyWorkshop, $anyConsult));
billStats("Others", $onlyOther);

billStats("Grand Total");

$this->kdm->reportEnd();