<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "NonricketConsult");
	// Example: 71154
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-lg-6">
			<?php require("partials/consult-introduction.php"); ?>
			<fieldset>
				<legend>Orthopedic Data</legend>
				<table>
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
		<div class="col-lg-6">
			<?php require("partials/patient-related.php"); ?>
			<fieldset>
				<legend>Conclusion</legend>
				<table>
					<?php (new t("NonricketConsult.Surgery66"))->tr("Surgery")->p(); ?>
					<?php //(new t("NonricketConsult.Othertreatment68"))->tr("Other treatment")->p(); ?>

					<?php // (new t("NonricketConsult.Nextappointment"))->tr()->p(); ?>
					<?php // (new t("NonricketConsult.NextCenter"))->tr()->p(); ?>
					<?php require("partials/consult-conclusion.php"); ?>
				</table>
			</fieldset>		
		</div>
	</div>
</div>