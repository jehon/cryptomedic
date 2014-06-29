<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-sm-6">
	<div ng-include="'partials/consult-introduction.php'"></div>
	<br>
	<fieldset>
		<legend><?php label("RicketConsult-FoodData"); ?></legend>
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
		<legend><?php label("RicketConsult-RicketsData"); ?></legend>
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
				<td><?php label("RicketConsult.Legs"); ?></td>
				<td><?php label("RicketConsult.Left"); ?></td>
				<td><?php label("RicketConsult.Right"); ?></td>
			</tr>
			<?php (new t("RicketConsult.?Leg"))->trLeftRight()->p(); ?>
			<?php (new t("RicketConsult.?legAngle"))->trLeftRight()->p(); ?>
			<tr>
				<td><?php label("RicketConsult-Cross"); ?></td>
				<td></td>
				<td></td>
			</tr>
			<?php (new t("RicketConsult.Cross?T"))->trLeftRight()->p(); ?>
			<?php (new t("RicketConsult.Cross?F"))->trLeftRight()->p(); ?>
			<?php (new t("RicketConsult.Laxity?"))->trLeftRight()->p(); ?>
			<?php (new t("RicketConsult.IMICDistance"))->tr()->p(); ?>
			<?php (new t("RicketConsult.Patelladislocation?"))->trLeftRight()->p(); ?>
			<tr>
				<td><?php label("RicketConsult-KneeMobility"); ?></td>
				<td>E</td>
				<td><?php (new t("RicketConsult.KneeMobilityE"))->value()->p(); ?></td>
			</tr><tr>
				<td></td>
				<td>F</td>
				<td><?php (new t("RicketConsult.KneeMobilityF"))->value()->p(); ?></td>
			</tr>
			<?php (new t("RicketConsult.XRay"))->tr()->p(); ?>
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<fieldset>
		<legend><?php label("RicketConsult-Conclusion"); ?></legend>
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