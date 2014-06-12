<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Discharge" name="SurgeryFollowup-Discharge">SurgeryFollowup-Discharge</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("SurgeryFollowup.Date");?></td>
				<td><?php value("SurgeryFollowup.Date"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.Examiner");?></td>
				<td><?php value("SurgeryFollowup.Examiner"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.Paracetamol");?></td>
				<td><?php value("SurgeryFollowup.Paracetamol"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.ParacetamolDays");?></td>
				<td><?php value("SurgeryFollowup.ParacetamolDays"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.cloxacilline");?></td>
				<td><?php value("SurgeryFollowup.cloxacilline"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.CloxacillineDays");?></td>
				<td><?php value("SurgeryFollowup.CloxacillineDays"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.Calcium");?></td>
				<td><?php value("SurgeryFollowup.Calcium"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.CalciumDays");?></td>
				<td><?php value("SurgeryFollowup.CalciumDays"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.CodLiverOil");?></td>
				<td><?php value("SurgeryFollowup.CodLiverOil"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.StitchOffDate");?></td>
				<td><?php value("SurgeryFollowup.StitchOffDate"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.PlasterDays");?></td>
				<td><?php value("SurgeryFollowup.PlasterDays"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentAfterPlasterWalkingBrace");?></td>
				<td><?php value("SurgeryFollowup.TreatmentAfterPlasterWalkingBrace"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes");?></td>
				<td><?php value("SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentAfterPlasterNightSplint");?></td>
				<td><?php value("SurgeryFollowup.TreatmentAfterPlasterNightSplint"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy");?></td>
				<td><?php value("SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy"); ?></td>
			</tr>				
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Visit" name="SurgeryFollowup-Visit">SurgeryFollowup-Visit</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("SurgeryFollowup.SkinCicatrisation");?></td>
				<td><?php value("SurgeryFollowup.SkinCicatrisation"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.BoneConsolidation");?></td>
				<td><?php value("SurgeryFollowup.BoneConsolidation"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.DeformityAxis");?></td>
				<td><?php value("SurgeryFollowup.DeformityAxis"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.ArticulationMobility");?></td>
				<td><?php value("SurgeryFollowup.ArticulationMobility"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.WalkingDifficulties");?></td>
				<td><?php value("SurgeryFollowup.WalkingDifficulties"); ?></td>
			</tr>				
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Treatment" name="SurgeryFollowup-Treatment">SurgeryFollowup-Treatment</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("SurgeryFollowup.TreatmentPhysiotherapy");?></td>
				<td><?php value("SurgeryFollowup.TreatmentPhysiotherapy"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentOrthopedicDevice");?></td>
				<td><?php value("SurgeryFollowup.TreatmentOrthopedicDevice"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentPlaster");?></td>
				<td><?php value("SurgeryFollowup.TreatmentPlaster"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.TreatmentOther");?></td>
				<td><?php value("SurgeryFollowup.TreatmentOther"); ?></td>
			</tr>				
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Conclusion" name="SurgeryFollowup-Conclusion">SurgeryFollowup-Conclusion</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("SurgeryFollowup.ResultImprovement");?></td>
				<td><?php value("SurgeryFollowup.ResultImprovement"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.ResultFamilyHappy");?></td>
				<td><?php value("SurgeryFollowup.ResultFamilyHappy"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.ResultChildrenHappy");?></td>
				<td><?php value("SurgeryFollowup.ResultChildrenHappy"); ?></td>
			</tr><tr>
				<td><?php label("SurgeryFollowup.NextAppointment");?></td>
				<td><?php value("SurgeryFollowup.NextAppointment"); ?></td>
			</tr>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>
	