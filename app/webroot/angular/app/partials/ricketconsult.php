<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<fieldset>
		<legend><label for="RicketConsult-GeneralData" name="RicketConsult-GeneralData">General Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("RicketConsult.Date");?></td>
				<td><?php value("RicketConsult.Date"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.ExaminerName");?></td>
				<td><?php value("RicketConsult.ExaminerName"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Center");?></td>
				<td><?php value("RicketConsult.Center"); ?></td>
			</tr><tr modes='read'>
					<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
				<td>{{ageAtConsultTimeStr()}}</td>
			</tr>
			<tr>
				<td><?php label("RicketConsult.SchoolClass");?></td>
				<td><?php value("RicketConsult.SchoolClass"); ?></td>
			</tr>
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
			<tr>
				<td><?php label("RicketConsult.HeightcmLying");?></td>
				<td><?php value("RicketConsult.HeightcmLying"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Sittingheightcm");?></td>
				<td><?php value("RicketConsult.Sittingheightcm"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Brachialcircumferencecm");?></td>
				<td><?php value("RicketConsult.Brachialcircumferencecm"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultWeightHeightRatio" name="RicketConsult.Weight_Height_Ratio">Weight/Height Ratio</label></td>
				<td class='tdright'>{{stats_wh() | mynumber:2 }}</td>
				<td>{{stats_ds_weight_height() | mynumber:2:'ds' }}</td>
			</tr><tr>
				<td><?php label("RicketConsult.bmi");?></td>
				<td>{{stats_bmi() | mynumber:2 }}</td>
				<td>{{stats_ds_bmi() | mynumber:2:'ds' }}</td>
			</tr><tr>
				<td><?php label("RicketConsult.Undernutrited");?></td>
				<td><?php value("RicketConsult.Undernutrited"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Worms");?></td>
				<td><?php value("RicketConsult.Worms"); ?></td>
			</tr>				
		</table>
	</fieldset>
	<br>
	<fieldset>
		<legend><label for="RicketConsult-FoodData" name="RicketConsult-FoodData">Food Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("RicketConsult.Ricewithchun");?></td>
				<td><?php value("RicketConsult.Ricewithchun"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Onebowlvegetables");?></td>
				<td><?php value("RicketConsult.Onebowlvegetables"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Twospoonsesamseedgrounded");?></td>
				<td><?php value("RicketConsult.Twospoonsesamseedgrounded"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Littlefishbowl");?></td>
				<td><?php value("RicketConsult.Littlefishbowl"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Milkglass");?></td>
				<td><?php value("RicketConsult.Milkglass"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Iodisedsalt");?></td>
				<td><?php value("RicketConsult.Iodisedsalt"); ?></td>
			</tr>
		</table>
	</fieldset>
	<br>
	<fieldset>
		<legend><label for="RicketConsult-RicketsData" name="RicketConsult-RicketsData">Rickets Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("RicketConsult.Ageofbeginningofthedeformitiesyear");?></td>
				<td><?php value("RicketConsult.Ageofbeginningofthedeformitiesyear"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Treatmenttaken");?></td>
				<td><?php value("RicketConsult.Treatmenttaken"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.WalkingDifficulties");?></td>
				<td><?php value("RicketConsult.WalkingDifficulties"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Pain");?></td>
				<td><?php value("RicketConsult.Pain"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Wristenlargement");?></td>
				<td><?php value("RicketConsult.Wristenlargement"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Ribbeading");?></td>
				<td><?php value("RicketConsult.Ribbeading"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Bossingforehead");?></td>
				<td><?php value("RicketConsult.Bossingforehead"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Cubitusvarus");?></td>
				<td><?php value("RicketConsult.Cubitusvarus"); ?></td>
			</tr><tr>
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
			</tr><tr>
				<td><?php label("RicketConsult.IMICDistance");?></td>
				<td><?php value("RicketConsult.IMICDistance"); ?></td>
			</tr><tr>
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
			</tr><tr>
				<td><?php label("RicketConsult.XRay");?></td>
				<td><?php value("RicketConsult.XRay"); ?></td>
			</tr>
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<fieldset>
		<legend><label for="RicketConsult-Conclusion" name="RicketConsult-Conclusion">Conclusion</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("RicketConsult.Nutritionaladvice");?></td>
				<td><?php value("RicketConsult.Nutritionaladvice"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Nutrisupport");?></td>
				<td><?php value("RicketConsult.Nutrisupport"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Medical");?></td>
				<td><?php value("RicketConsult.Medical"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultConclusionMedicalCalcium500" name="RicketConsult.conclusion_medical_calcium500">Calcium 500</label></td>
				<td><?php value("RicketConsult.conclusion_medical_calcium500"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultConclusionMedicalCalcium1000" name="RicketConsult.conclusion_medical_calcium1000">Calcium 1000</label></td>
				<td><?php value("RicketConsult.conclusion_medical_calcium1000"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultConclusionMedicalCodLiverOil" name="RicketConsult.conclusion_medical_codLiverOil">Cod Liver Oil</label></td>
				<td><?php value("RicketConsult.conclusion_medical_codLiverOil"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultConclusionMedicalVitaminD" name="RicketConsult.conclusion_medical_vitaminD">Vitamin D</label></td>
				<td><?php value("RicketConsult.conclusion_medical_vitaminD"); ?></td>
			</tr><tr>
				<td><label for="RicketConsultConclusionMedicalOther" name="RicketConsult.conclusion_medical_other">Other</label></td>
				<td><?php value("RicketConsult.conclusion_medical_other"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Surgery");?></td>
				<td><?php value("RicketConsult.Surgery"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Brace");?></td>
				<td><?php value("RicketConsult.Brace"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Commentary");?></td>
				<td><?php value("RicketConsult.Commentary"); ?></td>
			</tr><tr>
				<td><?php label("RicketConsult.Nextappointment");?></td>
				<td><?php value("RicketConsult.Nextappointment"); ?></td>
			</tr>
		</table>
	</fieldset>
</div>