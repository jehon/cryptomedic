<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
?>
	<div class="col-sm-6">
		<div ng-include="'partials/consult-introduction.php'"></div>
		<FieldSet>
			<legend><?php label("ClubFoot-Data"); ?></legend>
			<table  class='colorize'>
				<?php (new t("ClubFoot.Side"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Walking"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Pain"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Sport"))->tr()->p(); ?>
				<?php (new t("ClubFoot.WalkingFloorContact"))->tr()->p(); ?>
				<?php (new t("ClubFoot.WalkingFirstContact"))->tr()->p(); ?>
				<?php (new t("ClubFoot.JumpingOneLeg"))->tr()->p(); ?>
				<?php (new t("ClubFoot.JumpingReception"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Adduction"))->tr()->p(); ?>
				<?php (new t("ClubFoot.HindFootAngleD"))->tr()->p(); ?>
				<?php (new t("ClubFoot.ThighFoot"))->tr()->p(); ?>
				<?php (new t("ClubFoot.AdductionAngle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.HindFootAngleW"))->tr()->p(); ?>
				<?php (new t("ClubFoot.ThighFootAngle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DorsalFlexionMax"))->tr()->p(); ?>
				<?php (new t("ClubFoot.PlantarFlexionMax"))->tr()->p(); ?>
				<?php (new t("ClubFoot.PronationMax"))->tr()->p(); ?>
				<?php (new t("ClubFoot.SupinationMax"))->tr()->p(); ?>
				<?php (new t("ClubFoot.EquinusReduc"))->tr()->p(); ?>
				<?php (new t("ClubFoot.VarusReduc"))->tr()->p(); ?>
				<?php (new t("ClubFoot.CPBRotation"))->tr()->p(); ?>
				<?php (new t("ClubFoot.AdductionReduc"))->tr()->p(); ?>
				<?php (new t("ClubFoot.CavusFoot"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DeepPosteriorCrease"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DeepMedialCrease"))->tr()->p(); ?>
				<?php (new t("ClubFoot.AbnormalMuscle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DIMEGLIO"))->tr()->p(); ?>
			</table>
		</FieldSet>
	</div>
	<div class="col-sm-6">
		<div ng-include="'partials/patient-related.php'"></div>
		<FieldSet>
			<legend><?php label("ClubFoot-Conclusion"); ?></legend>
			<table  class='colorize'>
				<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Comment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Nextappointment"))->tr()->p(); ?>
			</table>
		</FieldSet>
	</div>
