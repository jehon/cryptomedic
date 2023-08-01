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
			<?php (new t("OtherConsult.side"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.joints_or_bones_affected"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.deformity"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.articulation_mobility"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.muscle_strength"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.pain"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.walk"))->tr2()->p(); ?>
			<?php (new t("OtherConsult.x-ray"))->tr2()->p(); ?>
		</x-group-panel>
		<x-group-panel title='Conclusion'>
			<?php (new t("OtherConsult.performed"))->tr2("Activities Performed by the Patient")->p(); ?>
			<?php (new t("OtherConsult.not_performed"))->tr2("Activities NOT Performed by the Patient")->p(); ?>
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