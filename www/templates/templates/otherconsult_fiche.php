<?php
t::setDefaultOption("baseExpression", "currentFile().");
t::setDefaultOption("model", "OtherConsult");
// Example: 71154
?>
<div ng-if='errors.dateInTheFuture'>
	<div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
</div>
<x-two-columns>
	<div>
		<?php require(__DIR__ . "/../helpers/consult-introduction.php"); ?>
		<x-group-panel title='Orthopedic Data'>
			<?php (new t("OtherConsult.Side"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Jointsorbonesaffected"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Deformity"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Articulationmobility"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Musclestrength"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Pain"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.Walk"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.XRay"))->tr2()->p(); ?>
		</x-group-panel>
		<x-group-panel title='Conclusion'>
			<?php (new t("OtherConsult.Performed"))->tr2("Activities Performed by the Patient")->p(); ?>
			<?php (new t("OtherConsult.NotPerformed"))->tr2("Activities NOT Performed by the Patient")->p(); ?>
		</x-group-panel>
	</div>
	<div>
		<x-ff-patient-related></x-ff-patient-related>
		<x-ff-next-appointment></x-ff-next-appointment>
		<x-group-panel title='Conclusion'>
			<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
		</x-group-panel>
	</div>
</x-two-columns>