<?php
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "RicketConsult");
	// Example: 10001
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-md-6">
			<?php require("partials/consult-introduction.php"); ?>
		 	<br>
			<fieldset>
				<legend>RicketsData</legend>
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
					<?php (new t("RicketConsult.?Leg"))->trRightLeft("Leg")->p(); ?>
					<?php (new t("RicketConsult.?legAngle"))->trRightLeft("Leg Angle")->p(); ?>
					<tr>
						<td>Cross</td>
						<td></td>
						<td></td>
					</tr>
					<?php (new t("RicketConsult.Cross?T"))->trRightLeft()->p(); ?>
					<?php (new t("RicketConsult.Cross?F"))->trRightLeft()->p(); ?>
					<?php (new t("RicketConsult.IMICDistance"))->tr()->p(); ?>
					<?php (new t("RicketConsult.XRay"))->tr()->p(); ?>
				</table>
			</fieldset>
		</div>
		<div class="col-md-6">
			<?php require("partials/patient-related.php"); ?>
			<fieldset>
				<legend>Conclusion</legend>
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
					<?php require("partials/consult-conclusion.php"); ?>
				</table>
			</fieldset>
		</div>
	</div>
</div>
