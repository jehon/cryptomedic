<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<fieldset>
	<legend><?php (new t("NonricketConsult-GeneralData"))->label()->p(); ?></legend>
	<table  class='colorize'>
		<col width='30%' /><col width='*' /> 
		<?php (new t("NonricketConsult.Date"))->tr()->p(); ?>
		<?php (new t("NonricketConsult.ExaminerName"))->tr()->p(); ?>
		<?php (new t("NonricketConsult.Center"))->tr()->p(); ?>
		<tr class='notModeWrite'>
			<td><?php (new t("Patient-Age"))->label()->p(); ?></td>
			<td>{{ageAtConsultTimeStr()}}</td>
		</tr>
	</table>
</fieldset>
<br/>
<fieldset>
	<legend><?php (new t("NonricketConsult-NutritionalData"))->label()->p(); ?></legend>
	<table class='colorize'>
		<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
		<tr><td/><td/><td>Deviation :</td></tr>					<tr>
			<td><?php (new t("NonricketConsult.Weightkg"))->label()->p(); ?></td>
			<td class='tdright'><?php (new t("NonricketConsult.Weightkg"))->value()->p(); ?></td>
			<td>{{stats_ds_weight() | mynumber:2:'ds' }}</td>
		</tr><tr>
			<td><?php (new t("NonricketConsult.Heightcm"))->label()->p(); ?></td>
			<td class='tdright'><?php (new t("NonricketConsult.Heightcm"))->value()->p(); ?></td>
			<td>{{stats_ds_height() | mynumber:2:'ds' }}</div></td>
		</tr><tr>
			<td><?php (new t("NonricketConsult-WeightHeightRatio"))->label()->p(); ?></td>
			<td class='tdright'>{{stats_wh() | mynumber:2 }}</td>
			<td>{{stats_ds_weight_height() | mynumber:2:'ds' }}</td>
		</tr><tr>
			<td><?php (new t("NonricketConsult.bmi"))->label()->p(); ?></td>
			<td>{{stats_bmi() | mynumber:2 }}</td>
			<td>{{stats_ds_bmi() | mynumber:2:'ds' }}</td>
		</tr>
		<?php (new t("NonricketConsult.Brachialcircumferencecm"))->label()->p(); ?>
	</table>
</fieldset>
