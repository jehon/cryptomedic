<?php
	// Example: 90658
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("model", "ClubFoot");
?>
<div class='container-fluid'>
	<div class='row'>
    	<div ng-if='errors.dateInTheFuture'>
		    <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    	</div>
  	</div>
	<div class='row'>
		<div class="col-md-6">
			<?php require(__DIR__ . "/../helpers/consult-introduction.php"); ?>
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
					<tr ng-class='{ emptyValue: !currentFile().CurvedLateralBorderRight && !currentFile().CurvedLateralBorderLeft }'>
						<td><label>Curved Lateral Border</label></td>
						<td><?php (new t("ClubFoot.CurvedLateralBorderRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.CurvedLateralBorderLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().MedialCreaseRight && !currentFile().MedialCreaseLeft }'>
						<td><label>Medial Crease</label></td>
						<td><?php (new t("ClubFoot.MedialCreaseRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.MedialCreaseLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().TalarHeadCoverageRight && !currentFile().TalarHeadCoverageLeft }'>
						<td><label>Talar Head Coverage</label></td>
						<td><?php (new t("ClubFoot.TalarHeadCoverageRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.TalarHeadCoverageLeft"))->value()->p(); ?></td>
					</tr>

					<tr><td>Hind foot</td><td></td><td></td></tr>
					<tr ng-class='{ emptyValue: !currentFile().PosteriorCreaseRight && !currentFile().PosteriorCreaseLeft }'>
						<td><label>Posterior Crease</label></td>
						<td><?php (new t("ClubFoot.PosteriorCreaseRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.PosteriorCreaseLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().RigidEquinusRight && !currentFile().RigidEquinusLeft }'>
						<td><label>Rigid Equinus</label></td>
						<td><?php (new t("ClubFoot.RigidEquinusRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.RigidEquinusLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().EmptyHeelRight && !currentFile().EmptyHeelLeft }'>
						<td><label>Empty Heel</label></td>
						<td><?php (new t("ClubFoot.EmptyHeelRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.EmptyHeelLeft"))->value()->p(); ?></td>
					</tr>

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
					<tr ng-class='{ emptyValue: !currentFile().PainRight && !currentFile().PainLeft }'>
						<td><label>Pain</label></td>
						<td><?php (new t("ClubFoot.PainRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.PainLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().WalkingFloorContactRight && !currentFile().WalkingFloorContactLeft }'>
						<td><label>Walking Floor Contact</label></td>
						<td><?php (new t("ClubFoot.WalkingFloorContactRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.WalkingFloorContactLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().WalkingFirstContactRight && !currentFile().WalkingFirstContactLeft }'>
						<td><label>Walking First Contact</label></td>
						<td><?php (new t("ClubFoot.WalkingFirstContactRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.WalkingFirstContactLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().JumpingOneLegRight && !currentFile().JumpingOneLegLeft }'>
						<td><label>Jumping One Leg</label></td>
						<td><?php (new t("ClubFoot.JumpingOneLegRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.JumpingOneLegLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().RunRight && !currentFile().RunLeft }'>
						<td><label>Run</label></td>
						<td><?php (new t("ClubFoot.RunRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.RunLeft"))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().AdductionAngleRight && !currentFile().AdductionAngleLeft }'>
						<td><label>Adduction Angle</label></td>
						<td><?php (new t("ClubFoot.AdductionAngleRight", array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.AdductionAngleLeft",  array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().HindFootAngleWRight && !currentFile().HindFootAngleWLeft }'>
						<td><?php (new t("ClubFoot.HindFootAngleWRight", array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.HindFootAngleWLeft",  array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().DorsalFlexionMaxRight && !currentFile().DorsalFlexionMaxLeft }'>
						<td><label>Dorsal Flexion Max</label></td>
						<td><?php (new t("ClubFoot.DorsalFlexionMaxRight", array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.DorsalFlexionMaxLeft",  array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().PlantarFlexionMaxRight && !currentFile().PlantarFlexionMaxLeft }'>
						<td><label>Plantar Flexion Max</label></td>
						<td><?php (new t("ClubFoot.PlantarFlexionMaxRight", array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.PlantarFlexionMaxLeft",  array("inline" => "min=-90 max=90")))->value()->p(); ?></td>
					</tr>
					<tr ng-class='{ emptyValue: !currentFile().MuscularInbalanceRight && !currentFile().MuscularInbalanceLeft }'>
						<td><label>Muscular in balance</label></td>
						<td><?php (new t("ClubFoot.MuscularInbalanceRight"))->value()->p(); ?></td>
						<td><?php (new t("ClubFoot.MuscularInbalanceLeft"))->value()->p(); ?></td>
					</tr>
				</table>
			</FieldSet>
		</div>
		<div class="col-md-6">
			<?php require(__DIR__ . "/../helpers/patient-related.html"); ?>
			<FieldSet>
				<legend>Conclusion</legend>
				<table>
					<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
					<?php require(__DIR__ . "/../helpers/consult-conclusion.php"); ?>
				</table>
			</FieldSet>
		</div>
	</div>
</div>
