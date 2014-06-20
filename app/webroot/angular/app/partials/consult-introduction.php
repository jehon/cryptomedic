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
			<td>{{ageAtConsultTimeStr()}}</td>
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
			<td>{{stats_ds_weight() | mynumber:2:'ds' }}</td>
		</tr><tr>
			<td><?php label("Consultation.Heightcm"); ?></td>
			<td class='tdright'><?php (new t("NonricketConsult.Heightcm"))->value()->p(); ?></td>
			<td>{{stats_ds_height() | mynumber:2:'ds' }}</div></td>
		</tr><tr>
			<td><?php label("Consultation-WeightHeightRatio"); ?></td>
			<td class='tdright'>{{stats_wh() | mynumber:2 }}</td>
			<td>{{stats_ds_weight_height() | mynumber:2:'ds' }}</td>
		</tr><tr>
			<td><?php label("Consultation.bmi"); ?></td>
			<td>{{stats_bmi() | mynumber:2 }}</td>
			<td>{{stats_ds_bmi() | mynumber:2:'ds' }}</td>
		</tr>
		<?php label("Consultation.Brachialcircumferencecm"); ?>
	</table>
</fieldset>
