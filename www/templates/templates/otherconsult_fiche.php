<?php
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "OtherConsult");
	// Example: 71154
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
			<fieldset>
				<legend>Orthopedic Data</legend>
				<table>
					<?php (new t("OtherConsult.Side"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Jointsorbonesaffected"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Deformity"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Articulationmobility"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Musclestrength"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Pain"))->tr()->p(); ?>
					<?php (new t("OtherConsult.Walk"))->tr()->p(); ?>
					<?php (new t("OtherConsult.XRay"))->tr()->p(); ?>
				</table>
			</fieldset>
			<fieldset>
				<legend>Conclusion</legend>
				<table>
					<?php (new t("OtherConsult.Performed"))->tr("Activities Performed by the Patient")->p(); ?>
					<?php (new t("OtherConsult.NotPerformed"))->tr("Activities NOT Performed by the Patient")->p(); ?>
				</table>
			</fieldset>
		</div>
		<div class="col-md-6">
			<?php require(__DIR__ . "/../helpers/patient-related.php"); ?>
			<fieldset>
				<legend>Conclusion</legend>
				<table>
					<?php (new t("OtherConsult.Surgery66"))->tr("Surgery")->p(); ?>
					<?php //(new t("OtherConsult.Othertreatment68"))->tr("Other treatment")->p(); ?>

					<?php // (new t("OtherConsult.Nextappointment"))->tr()->p(); ?>
					<?php // (new t("OtherConsult.NextCenter"))->tr()->p(); ?>
					<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
				</table>
			</fieldset>
		</div>
	</div>
</div>
