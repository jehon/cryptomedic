<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "NonricketConsult");
	// Example: 10001
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-lg-6">
			<?php require("partials/consult-introduction.php"); ?>
		<!--
		 	<fieldset>
				<legend>FoodData</legend>
				<table class='colorize'>
					<col width='30%' /><col width='*' /> 
					<?php //(new t("RicketConsult.Ricewithchun"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Onebowlvegetables"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Twospoonsesamseedgrounded"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Littlefishbowl"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Milkglass"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Iodisedsalt"))->tr()->p(); ?>
				</table>
			</fieldset>
		 -->
		 	<br>
			<fieldset>
				<legend>RicketsData</legend>
				<table>
					<?php //(new t("RicketConsult.Ageofbeginningofthedeformitiesyear"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Treatmenttaken"))->tr()->p(); ?>
					<?php (new t("RicketConsult.WalkingDifficulties"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Pain"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Wristenlargement"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Ribbeading"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Bossingforehead"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Cubitusvarus"))->tr()->p(); ?>
					<tr>
						<td>Legs</td>
						<td>Left</td>
						<td>Right</td>
					</tr>
					<?php (new t("RicketConsult.?Leg"))->trLeftRight("Leg")->p(); ?>
					<?php (new t("RicketConsult.?legAngle"))->trLeftRight("Leg Angle")->p(); ?>
					<tr>
						<td>Cross</td>
						<td></td>
						<td></td>
					</tr>
					<?php (new t("RicketConsult.Cross?T"))->trLeftRight()->p(); ?>
					<?php (new t("RicketConsult.Cross?F"))->trLeftRight()->p(); ?>
					<?php //(new t("RicketConsult.Laxity?"))->trLeftRight()->p(); ?>
					<?php (new t("RicketConsult.IMICDistance"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Patelladislocation?"))->trLeftRight()->p(); ?>
		<!--
					<tr>
						<td>KneeMobility</td>
						<td>E</td>
						<td><?php //(new t("RicketConsult.KneeMobilityE"))->value()->p(); ?></td>
					</tr><tr>
						<td></td>
						<td>F</td>
						<td><?php //(new t("RicketConsult.KneeMobilityF"))->value()->p(); ?></td>
					</tr>
		-->
					<?php (new t("RicketConsult.XRay"))->tr()->p(); ?>
				</table>
			</fieldset>
		</div>
		<div class="col-lg-6">
			<div ng-include="'/rest/templates/patient-related.html'"></div>
			<fieldset>
				<legend>Conclusion</legend>
				<table>
					<?php //(new t("RicketConsult.Nutritionaladvice"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Nutrisupport"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Medical"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_calcium500"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_calcium1000"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.conclusion_medical_codLiverOil"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_vitaminD"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.conclusion_medical_other"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Surgery"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Brace"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Commentary"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Nextappointment"))->tr()->p(); ?>
					<?php (new t("RicketConsult.NextCenter"))->tr()->p(); ?>
				</table>
			</fieldset>
		</div>
	</div>
</div>