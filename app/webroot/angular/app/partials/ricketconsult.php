<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<fieldset>
		<legend><label for="RicketConsult-GeneralData" name="RicketConsult-GeneralData">General Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("RicketConsult.Date"))->tr()->p(); ?>
			<?php (new t("RicketConsult.ExaminerName"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Center"))->tr()->p(); ?>
			<tr modes='read'>
				<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
				<td>{{ageAtConsultTimeStr()}}</td>
			</tr>
			<?php (new t("RicketConsult.SchoolClass"))->tr()->p(); ?>
		</table>
	</fieldset>
	<br>
	<fieldset>
		<legend><label for="RicketConsult-NutritionnalData" name="RicketConsult-NutritionnalData">Nutritionnal Data</label></legend>
			<table class='colorize'>
			<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
			<tr>
				<td><?php label("RicketConsult.Weightkg");?></td>
				<td><?php value("RicketConsult.Weightkg"); ?></td>
				<td>{{stats_ds_weight() | mynumber:2:'ds' }}</td>
			</tr>
			<tr>
				<td><?php label("RicketConsult.Heightcm");?></td>
				<td><?php value("RicketConsult.Heightcm"); ?></td>
				<td>{{stats_ds_height() | mynumber:2:'ds' }}</div></td>
			</tr>
			<?php (new t("RicketConsult.HeightcmLying"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Sittingheightcm"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Brachialcircumferencecm"))->tr()->p(); ?>
			<tr>
				<td><label for="RicketConsultWeightHeightRatio" name="RicketConsult.Weight_Height_Ratio">Weight/Height Ratio</label></td>
				<td class='tdright'>{{stats_wh() | mynumber:2 }}</td>
				<td>{{stats_ds_weight_height() | mynumber:2:'ds' }}</td>
			</tr><tr>
				<td><?php label("RicketConsult.bmi");?></td>
				<td>{{stats_bmi() | mynumber:2 }}</td>
				<td>{{stats_ds_bmi() | mynumber:2:'ds' }}</td>
			</tr>				<?php (new t("RicketConsult.Undernutrited"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Worms"))->tr()->p(); ?>
		</table>
	</fieldset>
	<br>
	<fieldset>
		<legend><label for="RicketConsult-FoodData" name="RicketConsult-FoodData">Food Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("RicketConsult.Ricewithchun"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Onebowlvegetables"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Twospoonsesamseedgrounded"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Littlefishbowl"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Milkglass"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Iodisedsalt"))->tr()->p(); ?>
		</table>
	</fieldset>
	<br>
	<fieldset>
		<legend><label for="RicketConsult-RicketsData" name="RicketConsult-RicketsData">Rickets Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("RicketConsult.Ageofbeginningofthedeformitiesyear"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Treatmenttaken"))->tr()->p(); ?>
			<?php (new t("RicketConsult.WalkingDifficulties"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Pain"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Wristenlargement"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Ribbeading"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Bossingforehead"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Cubitusvarus"))->tr()->p(); ?>
			<tr>
				<td><?php label("RicketConsult.Legs");?></td>
				<td><?php label("RicketConsult.Left");?></td>
				<td><?php label("RicketConsult.Right");?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Measure");?></td>
				<td><?php value("RicketConsult.Rightleg"); ?></td>
				<td><?php value("RicketConsult.Leftleg"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Angle");?></td>
				<td><?php value("RicketConsult.RightlegAngle"); ?> degrees</td>
				<td><?php value("RicketConsult.LeftlegAngle"); ?> degrees</td>
			</tr><tr>
				<td><label for="RicketConsult-Cross" name="RicketConsult-Cross">Cross</label></td>
				<td></td>
				<td></td>
			</tr><tr>
				<td><?php label("T");?></td>
				<td><?php value("RicketConsult.CrossLeftT"); ?></td>
				<td><?php value("RicketConsult.CrossRightT"); ?></td>
			</tr><tr>
				<td><?php label("F");?></td>
				<td><?php value("RicketConsult.CrossLeftF"); ?></td>
				<td><?php value("RicketConsult.CrossRightF"); ?></td>
			</tr><tr>
				<td><label for="RicketConsult-Laxity" name="RicketConsult-Laxity">Laxity</label></td>
				<td><?php value("RicketConsult.LaxityLeft"); ?></td>
				<td><?php value("RicketConsult.LaxityRight"); ?></td>
			</tr>
			<?php (new t("RicketConsult.IMICDistance"))->tr()->p(); ?>
			<tr>
				<td><label for="RicketConsult-Patelladislocation" name="RicketConsult-Patelladislocation">RicketConsult-Patelladislocation</label></td>
				<td><?php value("RicketConsult.PatelladislocationLeft"); ?></td>
				<td><?php value("RicketConsult.PatelladislocationRight"); ?></td>
			</tr><tr>
				<td><label for="RicketConsult-KneeMobility" name="RicketConsult-KneeMobility">Knee mobility</label></td>
				<td>E</td>
				<td><?php value("RicketConsult.KneeMobilityE"); ?></td>
			</tr><tr>
				<td></td>
				<td>F</td>
				<td><?php value("RicketConsult.KneeMobilityF"); ?></td>
			</tr>
			<?php (new t("RicketConsult.XRay"))->tr()->p(); ?>
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<fieldset>
		<legend><label for="RicketConsult-Conclusion" name="RicketConsult-Conclusion">Conclusion</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("RicketConsult.Nutritionaladvice"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Nutrisupport"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Medical"))->tr()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_calcium500"))->tr()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_calcium1000"))->tr()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_codLiverOil"))->tr()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_vitaminD"))->tr()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_other"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Surgery"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Brace"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Commentary"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Nextappointment"))->tr()->p(); ?>
		</table>
	</fieldset>
</div>