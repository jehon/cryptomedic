<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('SurgeryFollowup.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('SurgeryFollowup.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="SurgeryFollowup" />
	<Table width='100%'>
		<tr>
			<td>
				<FieldSet>
					<Legend><label for="SurgeryFollowup-Discharge" name="SurgeryFollowup-Discharge">SurgeryFollowup-Discharge</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryFollowupDate" name="SurgeryFollowup.Date">SurgeryFollowup.Date</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.Date'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupExaminer" name="SurgeryFollowup.Examiner">SurgeryFollowup.Examiner</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.Examiner'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupParacetamol" name="SurgeryFollowup.Paracetamol">SurgeryFollowup.Paracetamol</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.Paracetamol'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupParacetamolDays" name="SurgeryFollowup.ParacetamolDays">SurgeryFollowup.ParacetamolDays</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.ParacetamolDays'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupCloxacilline" name="SurgeryFollowup.cloxacilline">SurgeryFollowup.cloxacilline</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.cloxacilline'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupCloxacillineDays" name="SurgeryFollowup.CloxacillineDays">SurgeryFollowup.CloxacillineDays</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.CloxacillineDays'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupCalcium" name="SurgeryFollowup.Calcium">SurgeryFollowup.Calcium</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.Calcium'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupCalciumDays" name="SurgeryFollowup.CalciumDays">SurgeryFollowup.CalciumDays</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.CalciumDays'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupCodLiverOil" name="SurgeryFollowup.CodLiverOil">SurgeryFollowup.CodLiverOil</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.CodLiverOil'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupStitchOffDate" name="SurgeryFollowup.StitchOffDate">SurgeryFollowup.StitchOffDate</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.StitchOffDate'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupPlasterDays" name="SurgeryFollowup.PlasterDays">SurgeryFollowup.PlasterDays</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.PlasterDays'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentAfterPlasterWalkingBrace" name="SurgeryFollowup.TreatmentAfterPlasterWalkingBrace">SurgeryFollowup.TreatmentAfterPlasterWalkingBrace</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentAfterPlasterWalkingBrace'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentAfterPlasterOrthopedicShoes" name="SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes">SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentAfterPlasterNightSplint" name="SurgeryFollowup.TreatmentAfterPlasterNightSplint">SurgeryFollowup.TreatmentAfterPlasterNightSplint</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentAfterPlasterNightSplint'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentAfterPlasterPhysioTherapy" name="SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy">SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy'); ?></td>
						</tr>				
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="SurgeryFollowup-Visit" name="SurgeryFollowup-Visit">SurgeryFollowup-Visit</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryFollowupSkinCicatrisation" name="SurgeryFollowup.SkinCicatrisation">SurgeryFollowup.SkinCicatrisation</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.SkinCicatrisation'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupBoneConsolidation" name="SurgeryFollowup.BoneConsolidation">SurgeryFollowup.BoneConsolidation</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.BoneConsolidation'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupDeformityAxis" name="SurgeryFollowup.DeformityAxis">SurgeryFollowup.DeformityAxis</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.DeformityAxis'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupArticulationMobility" name="SurgeryFollowup.ArticulationMobility">SurgeryFollowup.ArticulationMobility</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.ArticulationMobility'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupWalkingDifficulties" name="SurgeryFollowup.WalkingDifficulties">SurgeryFollowup.WalkingDifficulties</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.WalkingDifficulties'); ?></td>
						</tr>				
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="SurgeryFollowup-Treatment" name="SurgeryFollowup-Treatment">SurgeryFollowup-Treatment</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryFollowupTreatmentPhysiotherapy" name="SurgeryFollowup.TreatmentPhysiotherapy">SurgeryFollowup.TreatmentPhysiotherapy</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentPhysiotherapy'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentOrthopedicDevice" name="SurgeryFollowup.TreatmentOrthopedicDevice">SurgeryFollowup.TreatmentOrthopedicDevice</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentOrthopedicDevice'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentPlaster" name="SurgeryFollowup.TreatmentPlaster">SurgeryFollowup.TreatmentPlaster</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentPlaster'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupTreatmentOther" name="SurgeryFollowup.TreatmentOther">SurgeryFollowup.TreatmentOther</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.TreatmentOther'); ?></td>
						</tr>				
					</table>
				</FieldSet>
				<FieldSet>
					<Legend><label for="SurgeryFollowup-Conclusion" name="SurgeryFollowup-Conclusion">SurgeryFollowup-Conclusion</label></Legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryFollowupResultImprovement" name="SurgeryFollowup.ResultImprovement">SurgeryFollowup.ResultImprovement</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.ResultImprovement'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupResultFamilyHappy" name="SurgeryFollowup.ResultFamilyHappy">SurgeryFollowup.ResultFamilyHappy</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.ResultFamilyHappy'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupResultChildrenHappy" name="SurgeryFollowup.ResultChildrenHappy">SurgeryFollowup.ResultChildrenHappy</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.ResultChildrenHappy'); ?></td>
						</tr><tr>
							<td><label for="SurgeryFollowupNextAppointment" name="SurgeryFollowup.NextAppointment">SurgeryFollowup.NextAppointment</label></td>
							<td><? echo $kdm->makeInput('SurgeryFollowup.NextAppointment'); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
			<td>
				<span id='belongsTo'><?php echo $this->element('belongsTo'); ?></span>
			</td>
		</tr>
	</Table>
</form>