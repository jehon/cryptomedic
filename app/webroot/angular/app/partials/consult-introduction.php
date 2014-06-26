<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<fieldset>
	<legend><?php label("NonricketConsult-GeneralData"); ?></legend>
	<table  class='colorize'>
		<col width='30%' /><col width='*' /> 
		<?php (new t("NonricketConsult.Date"))->tr()->p(); ?>
		<?php (new t("NonricketConsult.ExaminerName"))->tr()->p(); ?>
		<?php (new t("NonricketConsult.Center"))->tr()->p(); ?>
		<tr class='notModeWrite'>
			<td><?php label("Patient-Age"); ?></td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ageAtConsultTime()">{{result | number:0 }} years old at consultation time</span></td>
		</tr>
	</table>
</fieldset>
<br/>
<fieldset>
	<legend><?php label("NonricketConsult-NutritionalData"); ?></legend>
	<table class='colorize'>
		<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
		<tr><td/><td/><td><?php label("Consultation-Deviation"); ?></td></tr>
		<tr>
			<td><?php label("Consultation.Weightkg"); ?></td>
			<td class='tdright'><?php (new t("NonricketConsult.Weightkg"))->value()->p(); ?></td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ds_weight()">{{result | number:2 }} ds</span></td>
		</tr><tr>
			<td><?php label("Consultation.Heightcm"); ?></td>
			<td class='tdright'><?php (new t("NonricketConsult.Heightcm"))->value()->p(); ?></td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ds_height()">{{result | number:2 }} ds</span></td>
		</tr><tr>
			<td><?php label("Consultation-WeightHeightRatio"); ?></td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().wh()">{{result | number:2 }}</span></td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ds_weight_height()">{{result | number:2 }} ds</span></td>
		</tr><tr>
			<td><?php label("Consultation.bmi"); ?></td>
			<td class='tdright'><span catch-it ng-model="folder" tryit="currentFile().bmi()">{{result | number:2 }}</span></td>
			<td><span catch-it ng-model="folder" tryit="currentFile().ds_bmi()">{{result | number:2 }} ds</span></td>
		</tr>
		<?php label("Consultation.Brachialcircumferencecm"); ?>
	</table>
</fieldset>
