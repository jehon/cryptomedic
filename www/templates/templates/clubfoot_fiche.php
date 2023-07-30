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
			<?php t::trSided('CurvedLateralBorder*'); ?>
			<?php t::trSided('MedialCrease*'); ?>
			<?php t::trSided('TalarHeadCoverage*'); ?>

			<div>Hind Foot</div>
			<?php t::trSided('PosteriorCrease*'); ?>
			<?php t::trSided('RigidEquinus*'); ?>
			<?php t::trSided('EmptyHeel*'); ?>

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
			<?php t::trSided('Pain*'); ?>
			<?php t::trSided('WalkingFloorContact*'); ?>
			<?php t::trSided('WalkingFirstContact*'); ?>
			<?php t::trSided('JumpingOneLeg*'); ?>
			<?php t::trSided('Run*'); ?>
			<?php t::trSided('AdductionAngle*'); ?>
			<?php t::trSided('HindFootAngleW*'); ?>
			<?php t::trSided('DorsalFlexionMax*'); ?>
			<?php t::trSided('PlantarFlexionMax*'); ?>
			<?php t::trSided('MuscularInbalance*'); ?>
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