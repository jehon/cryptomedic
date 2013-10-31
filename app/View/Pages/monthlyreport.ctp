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
	$res = $mbill->find('all', array('conditions' => array_merge($conditions, $timecondition),
			'fields' => $expression 
		));
	
// 	var_dump($res);
	$res = (float) array_pop($res[0][0]);
	if (floor($res) == $res) $res = (int) $res;
	return resultat($header, $res);
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
    $anyConsult["OR"][$f] = ">0";
}

$this->kdm->reportHeader("Workshop Activity");
$anyWorkshop = array("OR" => array());
foreach($mbill->billFields("workshop") as $f) {
	getBillCountBy($f, array("$f >" => 0));
    $anyWorkshop["OR"][$f] = ">0";
}

$this->kdm->reportHeader("Surgical activity");
$anySurgery = array("OR" => array());
foreach($mbill->billFields("surgical") as $f) {
	getBillCountBy($f, array("$f >" => 0));
    $anySurgery["OR"][$f] = ">0";
}

$this->kdm->reportHeader("Other activity");
foreach($mbill->billFields("other") as $f) {
	getBillCountBy($f, array("$f >" => 0));
}

$this->kdm->reportHeader("Financials");
$this->kdm->reportSubHeader("Consultation");
$treal = getBillExpressionBy("total asked", "SUM(total_asked)", $anyConsult);
$tpaid = getBillExpressionBy("total paid", "SUM(total_paid)", $anyConsult);
$kdm->reportLine("total paid / total real", $tpaid / $treal);

$this->kdm->reportSubHeader("Workshop");
$treal = getBillExpressionBy("total asked", "SUM(total_asked)", $anyWorkshop);
$tpaid = getBillExpressionBy("total paid", "SUM(total_paid)", $anyWorkshop);
$kdm->reportLine("total paid / total real", $tpaid / $treal);

$this->kdm->reportSubHeader("Surgery");
$treal = getBillExpressionBy("total asked", "SUM(total_asked)", $anySurgery);
$tpaid = getBillExpressionBy("total paid", "SUM(total_paid)", $anySurgery);
$kdm->reportLine("total paid / total real", $tpaid / $treal);


$this->kdm->reportSubHeader("Grand Total");
$treal = getBillExpressionBy("total real", "SUM(total_real)");
getBillExpressionBy("total asked", "SUM(total_asked)");
$tpaid = getBillExpressionBy("total paid", "SUM(total_paid)");
$kdm->reportLine("total paid / total real", $tpaid / $treal);

$this->kdm->reportEnd();