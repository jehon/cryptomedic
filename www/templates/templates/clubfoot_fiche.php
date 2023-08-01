<?php
// Example: 90658
t::setDefaultOption("baseExpression", "currentFile().");
t::setDefaultOption("model", "ClubFoot");
?>
<div ng-if='errors.dateInTheFuture'>
	<x-message level='error' id='errorDateFuture'>Error: The date can not be in the future!</x-message>
</div>
<x-two-columns>
	<div>
		<?php require(__DIR__ . "/../helpers/consult-introduction.php"); ?>
		<x-group-panel title='Club Foot Pirani Score'>
			<x-message level='error'>Warning! Left and right sides are opposite.</x-message>
			<x-fff-field>
				<div slot='right'>Right</div>
				<div slot='left'>Left</div>
			</x-fff-field>

			<div>Mid Foot</div>
			<?php t::trSided('curved_lateral_border_*'); ?>
			<?php t::trSided('medial_crease_*'); ?>
			<?php t::trSided('talar_head_coverage_*'); ?>

			<div>Hind Foot</div>
			<?php t::trSided('posterior_crease_*'); ?>
			<?php t::trSided('rigid_equinus_*'); ?>
			<?php t::trSided('empty_heel_*'); ?>

			<x-fff-field label='Total'>
				<div slot='right'>{{currentFile().getPiraniRight()}}</div>
				<div slot='left'>{{currentFile().getPiraniLeft()}}</div>
			</x-fff-field>
		</x-group-panel>
		<x-group-panel title='Walking Club Foot > 3 years CCRS'>
			<x-message level='error'>Warning! Left and right sides are opposite.</x-message>
			<x-fff-field>
				<div slot='right'>Right</div>
				<div slot='left'>Left</div>
			</x-fff-field>
			<?php t::trSided('pain_*'); ?>
			<?php t::trSided('walking_floor_contact_*'); ?>
			<?php t::trSided('walking_first_contact_*'); ?>
			<?php t::trSided('jumping_one_leg_*'); ?>
			<?php t::trSided('run_*'); ?>
			<?php t::trSided('adduction_angle_*'); ?>
			<?php t::trSided('hind_foot_angle_W_*'); ?>
			<?php t::trSided('dorsal_flexion_max_*'); ?>
			<?php t::trSided('plantar_flexion_max_*'); ?>
			<?php t::trSided('muscular_inbalance_*'); ?>
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