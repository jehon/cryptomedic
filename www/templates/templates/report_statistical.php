<?php

use App\Model\CryptomedicModel;
use App\Model\Bill;
use Cryptomedic\Lib\Lists;

?>
<table class="reporting ng-scope">
	<tbody>
		<tr>
			<td colspan="2" class="subheader">Requested</td>
		</tr>
		<tr>
			<td>Period</td>
			<td>{{result.params.when}}</td>
		</tr>

		<tr>
			<td colspan="2" class="subheader">Diagnostic</td>
		</tr>
		<tr>
			<td>If patient have multiple pathologies, he will be counted more than once</td>
			<td></td>
		</tr>
		<tr>
			<td>Ricket consults</td>
			<td>{{result.list.summary.pathologies.rickets.total}}</td>
		</tr>
		<tr>
			<td>Ricket consults (new only)</td>
			<td>{{result.list.summary.pathologies.rickets.new}}</td>
		</tr>
		<tr>
			<td>Ricket consults (old only)</td>
			<td>{{result.list.summary.pathologies.rickets.old}}</td>
		</tr>
		<tr>
			<td>Club Foots</td>
			<td>{{result.list.summary.pathologies.clubfoots.total}}</td>
		</tr>
		<tr>
			<td>Club Foots (new only)</td>
			<td>{{result.list.summary.pathologies.clubfoots.new}}</td>
		</tr>
		<tr>
			<td>Club Foots (old only)</td>
			<td>{{result.list.summary.pathologies.clubfoots.old}}</td>
		</tr>
		<tr>
			<td>Polio</td>
			<td>{{result.list.summary.pathologies.polio.total}}</td>
		</tr>
		<tr>
			<td>Burn</td>
			<td>{{result.list.summary.pathologies.burn.total}}</td>
		</tr>
		<tr>
			<td>CP</td>
			<td>{{result.list.summary.pathologies.cp.total}}</td>
		</tr>
		<tr>
			<td>Fracture</td>
			<td>{{result.list.summary.pathologies.fracture.total}}</td>
		</tr>
		<tr>
			<td>Infection</td>
			<td>{{result.list.summary.pathologies.infection.total}}</td>
		</tr>
		<tr>
			<td>Congenital</td>
			<td>{{result.list.summary.pathologies.congenital.total}}</td>
		</tr>
		<tr>
			<td>Adult</td>
			<td>{{result.list.summary.pathologies.adult.total}}</td>
		</tr>
		<tr>
			<td>Normal</td>
			<td>{{result.list.summary.pathologies.normal.total}}</td>
		</tr>
		<tr>
			<td>Other</td>
			<td>{{result.list.summary.pathologies.other.total}}</td>
		</tr>
		<tr>
			<td>All consultations</td>
			<td>{{result.list.summary.pathologies.total}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Patients seen</td>
		</tr>
		<tr>
			<td>Number of patients seen</td>
			<td>{{result.list.summary.nbPatients}}</td>
		</tr>

		<tr>
			<td colspan="2" class="subheader">Social Level</td>
		</tr>
		<tr>
			<td>Family income (mean)</td>
			<td>{{result.list.summary.sociallevel.familyincome | number:1}}</td>
		</tr>
		<tr>
			<td>Nb household mb (mean)</td>
			<td>{{result.list.summary.sociallevel.nbhousehold | number:1}}</td>
		</tr>
		<tr>
			<td>ratio (mean)</td>
			<td>{{result.list.summary.sociallevel.familyincome / result.list.summary.sociallevel.nbhousehold | number:2}}</td>
		</tr>
		<?php
		foreach (Lists::getList('SocialLevel') as $i) {
			echo "<tr><td>Social Level $i</td><td>{{result.list.summary.sociallevel[$i]}}</td></tr>";
		}
		?>
		<tr>
			<td>All social level together</td>
			<td>{{result.list.summary.sociallevel.total}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Where</td>
		</tr>
		<tr ng-repeat="c in centersList">
			<td>@<x-i18n value='{{c}}'></x-i18n>
			</td>
			<td>{{result.list.summary.centers[c]}}</td>
		</tr>
		<tr>
			<td>center unspecified</td>
			<td>{{result.list.summary.centers.unspecified}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Surgical activity</td>
		</tr>
		<?php
		foreach (Bill::getFieldsList(Bill::CAT_SURGICAL) as $i) {
			echo "<tr><td>$i</td><td>{{result.list.summary['$i']}}</td></tr>";
		}
		?>
		<tr>
			<td colspan="2" class="subheader">Medical Activity</td>
		</tr>
		<?php
		foreach (Bill::getFieldsList(Bill::CAT_MEDECINE) as $i) {
			echo "<tr><td>$i</td><td>{{result.list.summary['$i']}}</td></tr>";
		}
		?>
		<tr>
			<td colspan="2" class="subheader">Workshop Activity</td>
		</tr>
		<?php
		foreach (Bill::getFieldsList(Bill::CAT_WORKSHOP) as $i) {
			echo "<tr><td>$i</td><td>{{result.list.summary['$i']}}</td></tr>";
		}
		?>
		<tr>
			<td colspan="2" class="subheader">Consult Activity</td>
		</tr>
		<?php
		foreach (Bill::getFieldsList(Bill::CAT_CONSULT) as $i) {
			echo "<tr><td>$i</td><td>{{result.list.summary['$i']}}</td></tr>";
		}
		?>
		<tr>
			<td colspan="2" class="subheader">Other activity</td>
		</tr>
		<?php
		foreach (Bill::getFieldsList(Bill::CAT_OTHER) as $i) {
			echo "<tr><td>$i</td><td>{{result.list.summary['$i']}}</td></tr>";
		}
		?>
		<tr>
			<td colspan="2" class="subheader">Financials</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Surgery</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.surgery.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.surgery.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.surgery.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.surgery.paid / result.list.summary.financials.surgery.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Medical (exl. above)</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.medical.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.medical.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.medical.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.medical.paid / result.list.summary.financials.medical.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Workshop (exl. above)</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.workshop.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.workshop.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.workshop.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.workshop.paid / result.list.summary.financials.workshop.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Consults (exl. above)</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.consult.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.consult.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.consult.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.consult.paid / result.list.summary.financials.consult.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Others (exl. above)</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.other.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.other.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.other.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.other.paid / result.list.summary.financials.other.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
		<tr>
			<td colspan="2" class="subheader">Grand Total</td>
		</tr>
		<tr>
			<td>total_real</td>
			<td>{{result.list.summary.financials.total.real}}</td>
		</tr>
		<tr>
			<td>total_asked</td>
			<td>{{result.list.summary.financials.total.asked}}</td>
		</tr>
		<tr>
			<td>total_paid</td>
			<td>{{result.list.summary.financials.total.paid}}</td>
		</tr>
		<tr>
			<td>total paid / total real</td>
			<td>{{result.list.summary.financials.total.paid / result.list.summary.financials.total.real | number:2}}</td>
		</tr>
		<tr>
			<td colspan="2" class="subheader"></td>
		</tr>
	</tbody>
</table>