<?php 
	// Example: 90658

	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
	<div class="col-lg-6">
		<div ng-include="'partials/consult-introduction.php'"></div>
		<FieldSet>
			<legend>Club Foot Pirani Score (For left and right foots)</legend>
			<table>
				<tr><td>Mid foot</td></tr>
				<tr><td>TODO: Curved lateral border 0/0.5/1</td></tr>
				<tr><td>TODO: Medial crease 0/0.5/1</td></tr>
				<tr><td>TODO: Talar head coverage 0/0.5/1</td></tr>
				<tr><td>Hind foot</td></tr>
				<tr><td>TODO: Posterior crease 0/0.5/1</td></tr>
				<tr><td>TODO: Rigit equinus 0/0.5/1</td></tr>
				<tr><td>TODO: Empty heel 0/0.5/1</td></tr>
				<tr><td>TODO: Total</td></tr>
			</table>
		</FieldSet>
		<FieldSet>
			<legend>Walking Club Foot > 3 years CCRS (TODO: or left and right foots)</legend>
			<table>
				<?php //(new t("ClubFoot.Side"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Walking"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Pain"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.Sport"))->tr()->p(); ?>
				<?php (new t("ClubFoot.WalkingFloorContact"))->tr()->p(); ?>
				<?php (new t("ClubFoot.WalkingFirstContact"))->tr()->p(); ?>
				<?php (new t("ClubFoot.JumpingOneLeg"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.JumpingReception"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.Adduction"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.HindFootAngleD"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.ThighFoot"))->tr()->p(); ?>
				<?php (new t("ClubFoot.AdductionAngle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.HindFootAngleW"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.ThighFootAngle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DorsalFlexionMax"))->tr()->p(); ?>
				<?php (new t("ClubFoot.PlantarFlexionMax"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.PronationMax"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.SupinationMax"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.EquinusReduc"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.VarusReduc"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.CPBRotation"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.AdductionReduc"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.CavusFoot"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.DeepPosteriorCrease"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.DeepMedialCrease"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.AbnormalMuscle"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.DIMEGLIO"))->tr()->p(); ?>
				<tr><td>TODO: 0- Muscular inbalance (TA, TP, Ext DL, Ext HL)</td></tr>
			</table>
		</FieldSet>
	</div>
	<div class="col-lg-6">
		<div ng-include="'partials/patient-related.php'"></div>
		<FieldSet>
			<legend>Conclusion</legend>
			<table>
				<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Comment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Nextappointment"))->tr()->p(); ?>
			</table>
		</FieldSet>
	</div>
