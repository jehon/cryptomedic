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
			<?php (new t("RicketConsult.walking_difficulties"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.pain"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.wrist_enlargement"))->tr2()->p(); ?>
			<?php (new t("RicketConsult.rib_heading"))->tr2()->p(); ?>
			<div class='alert alert-danger'>Warning! Left and right sides are opposite.</div>
			<x-fff-field label='Legs'>
				<div slot='left'>Left</div>
				<div slot='right'>Right</div>
			</x-fff-field>
			<?php t::trSided('*_leg'); ?>
			<?php t::trSided('*_leg_angle'); ?>
			<div>Cross</div>
			<?php t::trSided('cross_*_T'); ?>
			<?php t::trSided('cross_*_F'); ?>
			<?php (new t("RicketConsult.IMIC_distance"))->tr2("IMIC Distance")->p(); ?>
			<?php (new t("RicketConsult.xray"))->tr2()->p(); ?>
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