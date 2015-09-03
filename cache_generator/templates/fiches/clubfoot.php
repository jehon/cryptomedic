<?php 
	// Example: 90658
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "ClubFoot");
?>
<div class='container-fluid' ng-controller='ctrl_file_clubfoots'>
	<div class='row'>
		<div class="col-lg-6">
			<?php require("partials/consult-introduction.php"); ?>
			<FieldSet>
				<legend>Club Foot Pirani Score</legend>
				<table>
					<thead>
						<tr>
							<th colspan=3>
								<div class='alert alert-danger'>Warning! Left and right sides are opposite.</div>
							</th>
						</tr>
						<tr>
							<th></th>
							<th>Right</th>
							<th>Left</th>
						</tr>
					</thead>
					<tr><td>Mid foot</td><td></td><td></td></tr>
					<?php (new t("ClubFoot.CurvedLateralBorder"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.MedialCrease"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.TalarHeadCoverage"))->trRightLeft()->p(); ?>
					<tr><td>Hind foot</td><td></td><td></td></tr>
					<?php (new t("ClubFoot.PosteriorCrease"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.RigidEquinus"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.EmptyHeel"))->trRightLeft()->p(); ?>
					<tr>
						<td>Total</td>
						<td>{{currentFile().getPiraniRight()}}</td>
						<td>{{currentFile().getPiraniLeft()}}</td>
					</tr>				
				</table>
			</FieldSet>
			<FieldSet>
				<legend>Walking Club Foot > 3 years CCRS</legend>
				<table>
					<thead>
						<tr>
							<th colspan=3>
								<div class='alert alert-danger'>Warning! Left and right sides are opposite.</div>
							</th>
						</tr>
						<tr>
							<th></th>
							<th>Right</th>
							<th>Left</th>
						</tr>
					</thead>
					<?php (new t("ClubFoot.Pain"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.WalkingFloorContact"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.WalkingFirstContact"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.JumpingOneLeg"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.Run"))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.AdductionAngle", array("inline" => "min=-90 max=90")))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.HindFootAngleW", array("inline" => "min=-90 max=90")))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.DorsalFlexionMax", array("inline" => "min=-90 max=90")))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.PlantarFlexionMax", array("inline" => "min=0 max=90")))->trRightLeft()->p(); ?>
					<?php (new t("ClubFoot.MuscularInbalance"))->trRightLeft()->p(); ?>
				</table>
			</FieldSet>
		</div>
		<div class="col-lg-6">
			<?php require("partials/patient-related.php"); ?>
			<FieldSet>
				<legend>Conclusion</legend>
				<table>
					<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
					<?php require("partials/consult-conclusion.php"); ?>
				</table>
			</FieldSet>
		</div>
	</div>
</div>