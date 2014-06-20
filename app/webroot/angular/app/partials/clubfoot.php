<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<legend><?php (new t("ClubFoot-GeneralData"))->label()->p(); ?></legend>
		<table  class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php (new t("ClubFoot.Date"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Date"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.ExaminerName"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.ExaminerName"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Center"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Center"); ?></td>
			</tr><tr modes='read'>
				<td><?php (new t("Patient-Age"))->label()->p(); ?></td>
				<td>{{ageAtConsultTimeStr()}}</td>
			</tr><tr>
				<td><?php (new t("ClubFoot.SchoolClass"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.SchoolClass"); ?></td>
			</tr>				
		</table>
	</FieldSet>
	<FieldSet>
		<legend><?php (new t("ClubFoot-NutritionnalData"))->label()->p(); ?></legend>
		<table  class='colorize'>
			<tr>
				<td><?php (new t("ClubFoot.Weightkg"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Weightkg"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Heightcm"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Heightcm"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.MUAC"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.MUAC"); ?></td>
			</tr>				
		</table>
	</FieldSet>
	<FieldSet>
		<legend><?php (new t("ClubFoot-Data"))->label()->p(); ?></legend>
		<table  class='colorize'>
			<tr>
				<td><?php (new t("ClubFoot.Side"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Side"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Walking"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Walking"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Pain"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Pain"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Sport"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Sport"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.WalkingFloorContact"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.WalkingFloorContact"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.WalkingFirstContact"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.WalkingFirstContact"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.JumpingOneLeg"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.JumpingOneLeg"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.JumpingReception"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.JumpingReception"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Adduction"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Adduction"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.HindFootAngleD"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.HindFootAngleD"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.ThighFoot"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.ThighFoot"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.AdductionAngle"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.AdductionAngle"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.HindFootAngleW"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.HindFootAngleW"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.ThighFootAngle"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.ThighFootAngle"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.DorsalFlexionMax"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.DorsalFlexionMax"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.PlantarFlexionMax"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.PlantarFlexionMax"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.PronationMax"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.PronationMax"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.SupinationMax"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.SupinationMax"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.EquinusReduc"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.EquinusReduc"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.VarusReduc"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.VarusReduc"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.CPBRotation"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.CPBRotation"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.AdductionReduc"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.AdductionReduc"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.CavusFoot"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.CavusFoot"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.DeepPosteriorCrease"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.DeepPosteriorCrease"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.DeepMedialCrease"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.DeepMedialCrease"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.AbnormalMuscle"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.AbnormalMuscle"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.DIMEGLIO"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.DIMEGLIO"); ?></td>
			</tr>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<FieldSet>
		<legend><?php (new t("ClubFoot-Conclusion"))->label()->p(); ?></legend>
		<table  class='colorize'>
			<tr>
				<td><?php (new t("ClubFoot.Treatment"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Treatment"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Comment"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Comment"); ?></td>
			</tr><tr>
				<td><?php (new t("ClubFoot.Nextappointment"))->label()->p(); ?></td>
				<td><?php value("ClubFoot.Nextappointment"); ?></td>
			</tr>
		</table>
	</FieldSet>
</div>
