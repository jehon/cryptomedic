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
			<x-group-panel title='Orthopedic Data'>
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
			</x-group-panel>
			<x-group-panel title='Conclusion'>
				<table>
					<?php (new t("OtherConsult.Performed"))->tr("Activities Performed by the Patient")->p(); ?>
					<?php (new t("OtherConsult.NotPerformed"))->tr("Activities NOT Performed by the Patient")->p(); ?>
				</table>
			</x-group-panel>
		</div>
		<div class="col-md-6">
			<x-ff-patient-related></x-ff-patient-related>
			<x-ff-next-appointment></x-ff-next-appointment>
			<x-group-panel title='Conclusion'>
				<?php (new t("OtherConsult.Surgery66"))->tr2("Surgery")->p(); ?>
				<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
			</x-group-panel>
		</div>
	</div>
</div>
