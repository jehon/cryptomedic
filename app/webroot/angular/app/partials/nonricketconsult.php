<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<fieldset>
		<legend><label for="NonricketConsult-GeneralData" name="NonricketConsult-GeneralData">General Data</label></legend>
		<table  class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("NonricketConsult.Date"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.ExaminerName"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Center"))->tr()->p(); ?>
			<tr modes='read'>
				<td><?php (new t("Patient-Age"))->tr()->p(); ?></td>
				<td>{{ageAtConsultTimeStr()}}</td>
			</tr>				
			<?php (new t("NonricketConsult.SchoolClass"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Pathology"))->tr()->p(); ?>
		</table>
	</fieldset>
	<br/>
	<fieldset>
		<legend><?php (new t("NonricketConsult-NutritionalData"))->tr()->p(); ?></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
			<tr><td/><td/><td>Deviation :</td></tr>					<tr>
				<td><?php label("NonricketConsult.Weightkg");?></td>
				<td class='tdright'><?php value("NonricketConsult.Weightkg"); ?></td>
				<td>{{stats_ds_weight() | mynumber:2:'ds' }}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.Heightcm");?></td>
				<td class='tdright'><?php value("NonricketConsult.Heightcm"); ?></td>
				<td>{{stats_ds_height() | mynumber:2:'ds' }}</div></td>
			</tr><tr>
				<td><label for="NonricketConsultWeightHeightRatio" name="NonricketConsult.Weight_Height_Ratio">Weight/Height Ratio</label></td>
				<td class='tdright'>{{stats_wh() | mynumber:2 }}</td>
				<td>{{stats_ds_weight_height() | mynumber:2:'ds' }}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.bmi");?></td>
				<td>{{stats_bmi() | mynumber:2 }}</td>
				<td>{{stats_ds_bmi() | mynumber:2:'ds' }}</td>
			</tr>				<?php (new t("NonricketConsult.Brachialcircumferencecm"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Undernutrited"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Worms"))->tr()->p(); ?>

		</table>
	</fieldset>
	<br/>
	<fieldset>
		<legend><label for="NonricketConsult-OrthopedicData" name="NonricketConsult-OrthopedicData">Orthopedic Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("NonricketConsult.Side"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Jointsorbonesaffected"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Deformity"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Articulationmobility"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Musclestrength"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Pain"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Walk"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.XRay"))->tr()->p(); ?>
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<fieldset>
		<legend><label for="NonricketConsult-Conclusion" name="NonricketConsult-Conclusion">Conclusion</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("NonricketConsult.Physiotherapy61"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Plaster62"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Orthopedicdevice65"))->tr(->p(); ?>
			<?php (new t("NonricketConsult.Surgery66"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Othertreatment68"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Comment"))->tr()->p(); ?>
			<?php (new t("NonricketConsult.Nextappointment"))->tr()->p(); ?>
		</table>
	</fieldset>		
</div>