<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('ClubFoot.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('ClubFoot.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="ClubFoot" />
	<Table width='100%'>
		<col width='50%'>
		<col width='50%'>
		<tr>
			<td>
				<FieldSet>
					<legend><label for="ClubFoot-GeneralData" name="ClubFoot-GeneralData">ClubFoot-GeneralData</label></legend>
					<table  class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="ClubFootDate" name="ClubFoot.Date">ClubFoot.Date</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Date'); ?></td>
						</tr><tr>
							<td><label for="ClubFootExaminerName" name="ClubFoot.ExaminerName">ClubFoot.ExaminerName</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.ExaminerName'); ?></td>
						</tr><tr>
							<td><label for="ClubFootCenter" name="ClubFoot.Center">ClubFoot.Center</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Center'); ?></td>
						</tr><tr modes='read'>
							<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
							<td><span id='stats_base_age'></span></td>
						</tr><tr>
							<td><label for="ClubFootSchoolClass" name="ClubFoot.SchoolClass">ClubFoot.SchoolClass</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.SchoolClass'); ?></td>
						</tr>				
					</table>
				</FieldSet>
				<FieldSet>
					<legend><label for="ClubFoot-NutritionnalData" name="ClubFoot-NutritionnalData">ClubFoot-NutritionnalData</label></legend>
					<table  class='colorize'>
						<tr>
							<td><label for="ClubFootWeightkg" name="ClubFoot.Weightkg">ClubFoot.Weightkg</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Weightkg'); ?></td>
						</tr><tr>
							<td><label for="ClubFootHeightcm" name="ClubFoot.Heightcm">ClubFoot.Heightcm</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Heightcm'); ?></td>
						</tr><tr>
							<td><label for="ClubFootMUAC" name="ClubFoot.MUAC">ClubFoot.MUAC</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.MUAC'); ?></td>
						</tr>				
					</table>
				</FieldSet>
				<FieldSet>
					<legend><label for="ClubFoot-Data" name="ClubFoot-Data">ClubFoot-Data</label></legend>
					<table  class='colorize'>
						<tr>
							<td><label for="ClubFootSide" name="ClubFoot.Side">ClubFoot.Side</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Side'); ?></td>
						</tr><tr>
							<td><label for="ClubFootWalking" name="ClubFoot.Walking">ClubFoot.Walking</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Walking'); ?></td>
						</tr><tr>
							<td><label for="ClubFootPain" name="ClubFoot.Pain">ClubFoot.Pain</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Pain'); ?></td>
						</tr><tr>
							<td><label for="ClubFootSport" name="ClubFoot.Sport">ClubFoot.Sport</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Sport'); ?></td>
						</tr><tr>
							<td><label for="ClubFootWalkingFloorContact" name="ClubFoot.WalkingFloorContact">ClubFoot.WalkingFloorContact</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.WalkingFloorContact'); ?></td>
						</tr><tr>
							<td><label for="ClubFootWalkingFirstContact" name="ClubFoot.WalkingFirstContact">ClubFoot.WalkingFirstContact</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.WalkingFirstContact'); ?></td>
						</tr><tr>
							<td><label for="ClubFootJumpingOneLeg" name="ClubFoot.JumpingOneLeg">ClubFoot.JumpingOneLeg</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.JumpingOneLeg'); ?></td>
						</tr><tr>
							<td><label for="ClubFootJumpingReception" name="ClubFoot.JumpingReception">ClubFoot.JumpingReception</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.JumpingReception'); ?></td>
						</tr><tr>
							<td><label for="ClubFootAdduction" name="ClubFoot.Adduction">ClubFoot.Adduction</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Adduction'); ?></td>
						</tr><tr>
							<td><label for="ClubFootHindFootAngleD" name="ClubFoot.HindFootAngleD">ClubFoot.HindFootAngleD</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.HindFootAngleD'); ?></td>
						</tr><tr>
							<td><label for="ClubFootThighFoot" name="ClubFoot.ThighFoot">ClubFoot.ThighFoot</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.ThighFoot'); ?></td>
						</tr><tr>
							<td><label for="ClubFootAdductionAngle" name="ClubFoot.AdductionAngle">ClubFoot.AdductionAngle</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.AdductionAngle'); ?></td>
						</tr><tr>
							<td><label for="ClubFootHindFootAngleW" name="ClubFoot.HindFootAngleW">ClubFoot.HindFootAngleW</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.HindFootAngleW'); ?></td>
						</tr><tr>
							<td><label for="ClubFootThighFootAngle" name="ClubFoot.ThighFootAngle">ClubFoot.ThighFootAngle</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.ThighFootAngle'); ?></td>
						</tr><tr>
							<td><label for="ClubFootDorsalFlexionMax" name="ClubFoot.DorsalFlexionMax">ClubFoot.DorsalFlexionMax</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.DorsalFlexionMax'); ?></td>
						</tr><tr>
							<td><label for="ClubFootPlantarFlexionMax" name="ClubFoot.PlantarFlexionMax">ClubFoot.PlantarFlexionMax</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.PlantarFlexionMax'); ?></td>
						</tr><tr>
							<td><label for="ClubFootPronationMax" name="ClubFoot.PronationMax">ClubFoot.PronationMax</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.PronationMax'); ?></td>
						</tr><tr>
							<td><label for="ClubFootSupinationMax" name="ClubFoot.SupinationMax">ClubFoot.SupinationMax</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.SupinationMax'); ?></td>
						</tr><tr>
							<td><label for="ClubFootEquinusReduc" name="ClubFoot.EquinusReduc">ClubFoot.EquinusReduc</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.EquinusReduc'); ?></td>
						</tr><tr>
							<td><label for="ClubFootVarusReduc" name="ClubFoot.VarusReduc">ClubFoot.VarusReduc</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.VarusReduc'); ?></td>
						</tr><tr>
							<td><label for="ClubFootCPBRotation" name="ClubFoot.CPBRotation">ClubFoot.CPBRotation</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.CPBRotation'); ?></td>
						</tr><tr>
							<td><label for="ClubFootAdductionReduc" name="ClubFoot.AdductionReduc">ClubFoot.AdductionReduc</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.AdductionReduc'); ?></td>
						</tr><tr>
							<td><label for="ClubFootCavusFoot" name="ClubFoot.CavusFoot">ClubFoot.CavusFoot</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.CavusFoot'); ?></td>
						</tr><tr>
							<td><label for="ClubFootDeepPosteriorCrease" name="ClubFoot.DeepPosteriorCrease">ClubFoot.DeepPosteriorCrease</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.DeepPosteriorCrease'); ?></td>
						</tr><tr>
							<td><label for="ClubFootDeepMedialCrease" name="ClubFoot.DeepMedialCrease">ClubFoot.DeepMedialCrease</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.DeepMedialCrease'); ?></td>
						</tr><tr>
							<td><label for="ClubFootAbnormalMuscle" name="ClubFoot.AbnormalMuscle">ClubFoot.AbnormalMuscle</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.AbnormalMuscle'); ?></td>
						</tr><tr>
							<td><label for="ClubFootDIMEGLIO" name="ClubFoot.DIMEGLIO">ClubFoot.DIMEGLIO</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.DIMEGLIO'); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element("belongsTo"); ?></span>
				<FieldSet>
					<legend><label for="ClubFoot-Conclusion" name="ClubFoot-Conclusion">ClubFoot-Conclusion</label></legend>
					<table  class='colorize'>
						<tr>
							<td><label for="ClubFootTreatment" name="ClubFoot.Treatment">ClubFoot.Treatment</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Treatment'); ?></td>
						</tr><tr>
							<td><label for="ClubFootComment" name="ClubFoot.Comment">ClubFoot.Comment</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Comment'); ?></td>
						</tr><tr>
							<td><label for="ClubFootNextappointment" name="ClubFoot.Nextappointment">ClubFoot.Nextappointment</label></td>
							<td><? echo $kdm->makeInput('ClubFoot.Nextappointment'); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
		</tr>
	</Table>
</form>