<?php
	use App\Http\Controllers\ReportController;
	require_once("../../../php/core.php");
	require(__DIR__ . "/../../../php/references.php");
?>
<table class="reporting ng-scope">
	<tbody>
		<tr><td colspan="2" class="subheader">Requested</td></tr>
		<tr><td>Period</td><td>{{result.params.when}}</td></tr>
		
		<tr><td colspan="2" class="subheader">Diagnostic</td></tr>
		<tr><td>If patient have multiple pathologies, he will be counted more than once</td><td></td></tr>
		<tr><td>Ricket consults</td><td>{{result.summary.pathologies.rickets.total}}</td></tr>
		<tr><td>Ricket consults (new only)</td><td>{{result.summary.pathologies.rickets.new}}</td></tr>
		<tr><td>Ricket consults (old only)</td><td>{{result.summary.pathologies.rickets.old}}</td></tr>
		<tr><td>Club Foots</td><td>{{result.summary.pathologies.clubfoots.total}}</td></tr>
		<tr><td>Club Foots (new only)</td><td>{{result.summary.pathologies.clubfoots.new}}</td></tr>
		<tr><td>Club Foots (old only)</td><td>{{result.summary.pathologies.clubfoots.old}}</td></tr>
		<tr><td>Polio</td><td>{{result.summary.pathologies.polio.total}}</td></tr>
		<tr><td>Burn</td><td>{{result.summary.pathologies.burn.total}}</td></tr>
		<tr><td>CP</td><td>{{result.summary.pathologies.cp.total}}</td></tr>
		<tr><td>Congenital</td><td>{{result.summary.pathologies.congenital.total}}</td></tr>
		<tr><td>Adult</td><td>{{result.summary.pathologies.adult.total}}</td></tr>
		<tr><td>Other</td><td>{{result.summary.pathologies.other.total}}</td></tr>
		<tr><td>All consultations</td><td>{{result.summary.pathologies.total}}</td></tr>
		
		<tr><td colspan="2" class="subheader">Social Level</td></tr>
		<tr><td>Family income (mean)</td><td>{{result.summary.sociallevel.familyincome | number:1}}</td></tr>
		<tr><td>Nb household mb (mean)</td><td>{{result.summary.sociallevel.nbhousehold | number:1}}</td></tr>
		<tr><td>ratio (mean)</td><td>{{result.summary.sociallevel.familyincome / result.summary.sociallevel.nbhousehold | number:2}}</td></tr>
<?php
	foreach(References::$lists['SocialLevel'] as $i) {
 		echo "<tr><td>Social Level $i</td><td>{{result.summary.sociallevel[$i]}}</td></tr>";
	}
?>
		<tr><td>All social level together</td><td>{{result.summary.sociallevel.total}}</td></tr>
		<tr><td colspan="2" class="subheader">Where</td></tr>
<?php 
	foreach(References::$lists['Centers'] as $i) {
		echo "<tr><td>@ $i</td><td>{{result.summary.centers." . clean($i) . "}}</td></tr>";
	}
?>
		<tr><td>center unspecified</td><td>{{result.summary.centers.unspecified}}</td></tr>
		<tr><td colspan="2" class="subheader">Surgical activity</td></tr>
<?php 
	foreach(Bill::getFielsList(Bill::CAT_SURGICAL) as $i) {
 		echo "<tr><td>$i</td><td>{{result.summary.$i}}</td></tr>";
	}
?>
		<tr><td colspan="2" class="subheader">Medical Activity</td></tr>
<?php 
	foreach(Bill::getFielsList(Bill::CAT_MEDECINE) as $i) {
 		echo "<tr><td>$i</td><td>{{result.summary.$i}}</td></tr>";
	}
?>
		<tr><td colspan="2" class="subheader">Workshop Activity</td></tr>
<?php 
	foreach(Bill::getFielsList(Bill::CAT_WORKSHOP) as $i) {
 		echo "<tr><td>$i</td><td>{{result.summary.$i}}</td></tr>";
	}
?>
		<tr><td colspan="2" class="subheader">Consult Activity</td></tr>
<?php 
	foreach(Bill::getFielsList(Bill::CAT_CONSULT) as $i) {
 		echo "<tr><td>$i</td><td>{{result.summary.$i}}</td></tr>";
	}
?>
		<tr><td colspan="2" class="subheader">Other activity</td></tr>
<?php 
	foreach(Bill::getFielsList(Bill::CAT_OTHER) as $i) {
 		echo "<tr><td>$i</td><td>{{result.summary.$i}}</td></tr>";
	}
?>
		<tr><td colspan="2" class="subheader">Financials</td></tr>
		<tr><td colspan="2" class="subheader">Surgery</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.surgery.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.surgery.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.surgery.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.surgery.paid / result.summary.financials.surgery.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
		<tr><td colspan="2" class="subheader">Medical (exl. above)</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.medical.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.medical.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.medical.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.medical.paid / result.summary.financials.medical.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
		<tr><td colspan="2" class="subheader">Workshop (exl. above)</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.workshop.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.workshop.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.workshop.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.workshop.paid / result.summary.financials.workshop.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
		<tr><td colspan="2" class="subheader">Consults (exl. above)</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.consult.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.consult.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.consult.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.consult.paid / result.summary.financials.consult.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
		<tr><td colspan="2" class="subheader">Others (exl. above)</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.other.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.other.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.other.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.other.paid / result.summary.financials.other.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
		<tr><td colspan="2" class="subheader">Grand Total</td></tr>
		<tr><td>total_real</td><td>{{result.summary.financials.total.real}}</td></tr>
		<tr><td>total_asked</td><td>{{result.summary.financials.total.asked}}</td></tr>
		<tr><td>total_paid</td><td>{{result.summary.financials.total.paid}}</td></tr>
		<tr><td>total paid / total real</td><td>{{result.summary.financials.total.paid / result.summary.financials.total.real | number:2}}</td></tr>
		<tr><td colspan="2" class="subheader"></td></tr>
	</tbody>
</table>
