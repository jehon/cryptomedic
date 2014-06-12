<?php require_once(__DIR__ . "/../php/templates.php"); ?>
	<div class="col-sm-6">
		<FieldSet>
			<legend><label for="ClubFoot-GeneralData" name="ClubFoot-GeneralData">ClubFoot-GeneralData</label></legend>
			<table  class='colorize'>
				<col width='30%' /><col width='*' /> 
				<tr>
					<td><?php label("ClubFoot.Date");?></td>
					<td><?php value("ClubFoot.Date"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.ExaminerName");?></td>
					<td><?php value("ClubFoot.ExaminerName"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Center");?></td>
					<td><?php value("ClubFoot.Center"); ?></td>
				</tr><tr modes='read'>
					<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
					<td>{{ageAtConsultTimeStr()}}</td>
				</tr><tr>
					<td><?php label("ClubFoot.SchoolClass");?></td>
					<td><?php value("ClubFoot.SchoolClass"); ?></td>
				</tr>				
			</table>
		</FieldSet>
		<FieldSet>
			<legend><label for="ClubFoot-NutritionnalData" name="ClubFoot-NutritionnalData">ClubFoot-NutritionnalData</label></legend>
			<table  class='colorize'>
				<tr>
					<td><?php label("ClubFoot.Weightkg");?></td>
					<td><?php value("ClubFoot.Weightkg"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Heightcm");?></td>
					<td><?php value("ClubFoot.Heightcm"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.MUAC");?></td>
					<td><?php value("ClubFoot.MUAC"); ?></td>
				</tr>				
			</table>
		</FieldSet>
		<FieldSet>
			<legend><label for="ClubFoot-Data" name="ClubFoot-Data">ClubFoot-Data</label></legend>
			<table  class='colorize'>
				<tr>
					<td><?php label("ClubFoot.Side");?></td>
					<td><?php value("ClubFoot.Side"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Walking");?></td>
					<td><?php value("ClubFoot.Walking"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Pain");?></td>
					<td><?php value("ClubFoot.Pain"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Sport");?></td>
					<td><?php value("ClubFoot.Sport"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.WalkingFloorContact");?></td>
					<td><?php value("ClubFoot.WalkingFloorContact"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.WalkingFirstContact");?></td>
					<td><?php value("ClubFoot.WalkingFirstContact"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.JumpingOneLeg");?></td>
					<td><?php value("ClubFoot.JumpingOneLeg"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.JumpingReception");?></td>
					<td><?php value("ClubFoot.JumpingReception"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Adduction");?></td>
					<td><?php value("ClubFoot.Adduction"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.HindFootAngleD");?></td>
					<td><?php value("ClubFoot.HindFootAngleD"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.ThighFoot");?></td>
					<td><?php value("ClubFoot.ThighFoot"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.AdductionAngle");?></td>
					<td><?php value("ClubFoot.AdductionAngle"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.HindFootAngleW");?></td>
					<td><?php value("ClubFoot.HindFootAngleW"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.ThighFootAngle");?></td>
					<td><?php value("ClubFoot.ThighFootAngle"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.DorsalFlexionMax");?></td>
					<td><?php value("ClubFoot.DorsalFlexionMax"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.PlantarFlexionMax");?></td>
					<td><?php value("ClubFoot.PlantarFlexionMax"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.PronationMax");?></td>
					<td><?php value("ClubFoot.PronationMax"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.SupinationMax");?></td>
					<td><?php value("ClubFoot.SupinationMax"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.EquinusReduc");?></td>
					<td><?php value("ClubFoot.EquinusReduc"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.VarusReduc");?></td>
					<td><?php value("ClubFoot.VarusReduc"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.CPBRotation");?></td>
					<td><?php value("ClubFoot.CPBRotation"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.AdductionReduc");?></td>
					<td><?php value("ClubFoot.AdductionReduc"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.CavusFoot");?></td>
					<td><?php value("ClubFoot.CavusFoot"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.DeepPosteriorCrease");?></td>
					<td><?php value("ClubFoot.DeepPosteriorCrease"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.DeepMedialCrease");?></td>
					<td><?php value("ClubFoot.DeepMedialCrease"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.AbnormalMuscle");?></td>
					<td><?php value("ClubFoot.AbnormalMuscle"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.DIMEGLIO");?></td>
					<td><?php value("ClubFoot.DIMEGLIO"); ?></td>
				</tr>
			</table>
		</FieldSet>
	</div>
	<div class="col-sm-6">
		<div ng-include="'partials/patient-related.php'"></div>
		<FieldSet>
			<legend><label for="ClubFoot-Conclusion" name="ClubFoot-Conclusion">ClubFoot-Conclusion</label></legend>
			<table  class='colorize'>
				<tr>
					<td><?php label("ClubFoot.Treatment");?></td>
					<td><?php value("ClubFoot.Treatment"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Comment");?></td>
					<td><?php value("ClubFoot.Comment"); ?></td>
				</tr><tr>
					<td><?php label("ClubFoot.Nextappointment");?></td>
					<td><?php value("ClubFoot.Nextappointment"); ?></td>
				</tr>
			</table>
		</FieldSet>
	</div>
