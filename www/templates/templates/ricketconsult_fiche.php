<?php
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "RicketConsult");
	// Example: 10001
?>
<div class='container-fluid'>
	<div class='row'>
    	<div ng-if='errors.dateInTheFuture'>
		    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    	</div>
  	</div>
	<div class='row'>
		<div class="col-md-6">
			<?php require(__DIR__ . "/../helpers/consult-introduction.php"); ?>
		 	<br>
			<x-group-panel title='RicketsData'>
				<table>
					<?php (new t("RicketConsult.WalkingDifficulties"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Pain"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Wristenlargement"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Ribbeading"))->tr()->p(); ?>
					<tr>
						<th colspan=3>
							<div class='alert alert-danger'>Warning! Left and right sides are opposite.</div>
						</th>
					</tr>
					<tr>
						<th>Legs</th>
						<th>Right</th>
						<th>Left</th>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().RightLeg && !currentFile().LeftLeg }'>
						<td><label>Leg</label></td>
						<td><?php (new t("RicketConsult.RightLeg"))->value()->p(); ?></td>
						<td><?php (new t("RicketConsult.LeftLeg"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().RightlegAngle && !currentFile().LeftlegAngle }'>
						<td><label>Leg Angle</label></td>
						<td><?php (new t("RicketConsult.RightlegAngle"))->value()->p(); ?></td>
						<td><?php (new t("RicketConsult.LeftlegAngle"))->value()->p(); ?></td>
					</tr>
					<tr>
						<td>Cross</td>
						<td></td>
						<td></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().CrossRightT && !currentFile().CrossLeftT }'>
						<td><label>Cross Right T</label></td>
						<td><?php (new t("RicketConsult.CrossRightT"))->value()->p(); ?></td>
						<td><?php (new t("RicketConsult.CrossLeftT"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().CrossRightF && !currentFile().CrossLeftF }'>
						<td><label>Cross Right F</label></td>
						<td><?php (new t("RicketConsult.CrossRightF"))->value()->p(); ?></td>
						<td><?php (new t("RicketConsult.CrossLeftF"))->value()->p(); ?></td>
					</tr>
					<?php (new t("RicketConsult.IMICDistance"))->tr()->p(); ?>
					<?php (new t("RicketConsult.XRay"))->tr()->p(); ?>
				</table>
			</x-group-panel>
		</div>
		<div class="col-md-6">
			<x-patient-related></x-patient-related>
			<x-group-panel title='Conclusion'>
				<table>
					<?php (new t("RicketConsult.Nutrisupport"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_calcium500"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_calcium1000"))->tr()->p(); ?>
					<?php (new t("RicketConsult.conclusion_medical_vitaminD"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Surgery"))->tr()->p(); ?>
					<?php (new t("RicketConsult.Brace"))->tr()->p(); ?>

					<?php //(new t("RicketConsult.Commentary"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.Nextappointment"))->tr()->p(); ?>
					<?php //(new t("RicketConsult.NextCenter"))->tr()->p(); ?>
					<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
				</table>
			</x-group-panel>
		</div>
	</div>
</div>
