<?php 
	// Example: 90658

	t::setDefaultOption("baseExpression", "currentFile().");
?>
<span ng-controller='ctrl_file_clubfoots'>
	<div class="col-lg-6">
		<div ng-include="'/rest/templates/consult-introduction.php'"></div>
		<FieldSet>
			<legend>Club Foot Pirani Score</legend>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Left</th>
						<th>Right</th>
					</tr>
				</thead>
				<tr><td>Mid foot</td><td></td><td></td></tr>
				<?php (new t("ClubFoot.CurvedLateralBorder"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.MedialCrease"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.TalarHeadCoverage"))->trLeftRight()->p(); ?>
				<tr><td>Hind foot</td><td></td><td></td></tr>
				<?php (new t("ClubFoot.PosteriorCrease"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.RigidEquinus"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.EmptyHeel"))->trLeftRight()->p(); ?>
				<tr>
					<td>Total</td>
					<td>{{getPiraniLeft()}}</td>
					<td>{{getPiraniRight()}}</td>
				</tr>				
			</table>
		</FieldSet>
		<FieldSet>
			<legend>Walking Club Foot > 3 years CCRS</legend>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Left</th>
						<th>Right</th>
					</tr>
				</thead>
				<?php //(new t("ClubFoot.Side"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.Walking"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Pain"))->trLeftRight()->p(); ?>
				<?php //(new t("ClubFoot.Sport"))->tr()->p(); ?>
				<?php (new t("ClubFoot.WalkingFloorContact"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.WalkingFirstContact"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.JumpingOneLeg"))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.Run"))->trLeftRight()->p(); ?>
				<?php //(new t("ClubFoot.JumpingReception"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.Adduction"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.HindFootAngleD"))->tr()->p(); ?>
				<?php //(new t("ClubFoot.ThighFoot"))->tr()->p(); ?>
				<?php (new t("ClubFoot.AdductionAngle", array("inline" => "min=0 max=90")))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.HindFootAngleW", array("inline" => "min=0 max=90")))->trLeftRight()->p(); ?>
				<?php //(new t("ClubFoot.ThighFootAngle"))->tr()->p(); ?>
				<?php (new t("ClubFoot.DorsalFlexionMax", array("inline" => "min=0 max=90")))->trLeftRight()->p(); ?>
				<?php (new t("ClubFoot.PlantarFlexionMax", array("inline" => "min=0 max=90")))->trLeftRight()->p(); ?>
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
				<?php (new t("ClubFoot.MuscularInbalance"))->trLeftRight()->p(); ?>
			</table>
		</FieldSet>
	</div>
	<div class="col-lg-6">
		<div ng-include="'/rest/templates/patient-related.html'"></div>
		<FieldSet>
			<legend>Conclusion</legend>
			<table>
				<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Comment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.Nextappointment"))->tr()->p(); ?>
				<?php (new t("ClubFoot.NextCenter"))->tr()->p(); ?>
			</table>
		</FieldSet>
	</div>
</span>