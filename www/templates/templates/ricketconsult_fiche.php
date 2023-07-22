<?php
t::setDefaultOption("baseExpression", "currentFile().");
t::setDefaultOption("model", "RicketConsult");
// Example: 10001
?>
<div ng-if='errors.dateInTheFuture'>
	<div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
</div>
<x-two-columns>
	<div>
		<?php require(__DIR__ . "/../helpers/consult-introduction.php"); ?>
		<br>
		<x-group-panel title='RicketsData'>
			<?php (new t("RicketConsult.WalkingDifficulties"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.Pain"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.Wristenlargement"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.Ribbeading"))->tr2()->p(); ?>
			<div class='alert alert-danger'>Warning! Left and right sides are opposite.</div>
			<x-fff-field label='Legs'>
				<div slot='left'>Left</div>
				<div slot='right'>Right</div>
			</x-fff-field>
			<?php t::trSided('*Leg'); ?>
			<?php t::trSided('*legAngle'); ?>
			<div>Cross</div>
			<?php t::trSided('Cross*T'); ?>
			<?php t::trSided('Cross*F'); ?>
			<?php (new t("RicketConsult.IMICDistance"))->tr2("IMIC Distance")->p(); ?>
			<?php (new t("RicketConsult.XRay"))->tr2()->p(); ?>
		</x-group-panel>
	</div>
	<div>
		<x-ff-patient-related></x-ff-patient-related>
		<x-ff-next-appointment></x-ff-next-appointment>
		<x-group-panel title='Conclusion'>
			<?php (new t("RicketConsult.Nutrisupport"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_calcium500"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_calcium1000"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.conclusion_medical_vitaminD"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.Brace"))->tr2()->p(); ?>

			<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
		</x-group-panel>
	</div>
</x-two-columns>