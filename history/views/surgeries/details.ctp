<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('Surgery.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('Surgery.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="Surgery" />
	<table width='100%'>
		<tr>
			<td>
				<fieldset>
					<legend><label for="Surgery-Order" name="Surgery-Order">Surgery-Order</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryOperation" name="Surgery.Operation">Operation</label></td>
							<td><? echo $kdm->makeInput('Surgery.Operation'); ?></td>
						</tr><tr>
							<td><label for="SurgeryTransferChittagong" name="Surgery.TransferChittagong">Surgery.TransferChittagong</label></td>
							<td><? echo $kdm->makeInput('Surgery.TransferChittagong'); ?></td>
						</tr><tr>
							<td><label for="SurgeryDate" name="Surgery.Date">Surgery.Date</label></td>
							<td><? echo $kdm->makeInput('Surgery.Date'); ?></td>
						</tr>
					</table>
				</fieldSet>
				<fieldSet>
					<legend><label for="Surgery-GeneralExamination" name="Surgery-GeneralExamination">Surgery-GeneralExamination</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryMedicalProblem" name="Surgery.MedicalProblem">Surgery.MedicalProblem</label></td>
							<td><? echo $kdm->makeInput('Surgery.MedicalProblem'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBleedingExecive" name="Surgery.BleedingExecive">Surgery.BleedingExecive</label></td>
							<td><? echo $kdm->makeInput('Surgery.BleedingExecive'); ?></td>
						</tr><tr>
							<td><label for="SurgeryGeneralCondition" name="Surgery.GeneralCondition">Surgery.GeneralCondition</label></td>
							<td><? echo $kdm->makeInput('Surgery.GeneralCondition'); ?></td>
						</tr><tr>
							<td><label for="SurgeryWeight" name="Surgery.Weight">Surgery.Weight</label></td>
							<td><? echo $kdm->makeInput('Surgery.Weight'); ?></td>
						</tr><tr>
							<td><label for="SurgeryHeightcm" name="Surgery.Heightcm">Surgery.Heightcm</label></td>
							<td><? echo $kdm->makeInput('Surgery.Heightcm'); ?></td>
						</tr><tr>
							<td><label for="SurgeryTemperatureF" name="Surgery.TemperatureF">Surgery.TemperatureF</label></td>
							<td><? echo $kdm->makeInput('Surgery.TemperatureF'); ?></td>
						</tr><tr>
							<td><label for="SurgeryPulsemin" name="Surgery.Pulsemin">Surgery.Pulsemin</label></td>
							<td><? echo $kdm->makeInput('Surgery.Pulsemin'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBloodPresureH" name="Surgery.BloodPresureH">Surgery.BloodPresureH</label></td>
							<td><? echo $kdm->makeInput('Surgery.BloodPresureH'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBloodPresureL" name="Surgery.BloodPresureL">Surgery.BloodPresureL</label></td>
							<td><? echo $kdm->makeInput('Surgery.BloodPresureL'); ?></td>
						</tr><tr>
							<td><label for="SurgeryHeartAuscultation" name="Surgery.HeartAuscultation">Surgery.HeartAuscultation</label></td>
							<td><? echo $kdm->makeInput('Surgery.HeartAuscultation'); ?></td>
						</tr><tr>
							<td><label for="SurgeryChestAuscultation" name="Surgery.ChestAuscultation">Surgery.ChestAuscultation</label></td>
							<td><? echo $kdm->makeInput('Surgery.ChestAuscultation'); ?></td>
						</tr><tr>
							<td><label for="SurgerySkin" name="Surgery.Skin">Surgery.Skin</label></td>
							<td><? echo $kdm->makeInput('Surgery.Skin'); ?></td>
						</tr><tr>
							<td><label for="SurgeryMouthAndTeeth" name="Surgery.MouthAndTeeth">Surgery.MouthAndTeeth</label></td>
							<td><? echo $kdm->makeInput('Surgery.MouthAndTeeth'); ?></td>
						</tr><tr>
							<td><label for="SurgeryWorms" name="Surgery.Worms">Surgery.Worms</label></td>
							<td><? echo $kdm->makeInput('Surgery.Worms'); ?></td>
						</tr><tr>
							<td><label for="SurgeryTreatment" name="Surgery.Treatment">Surgery.Treatment</label></td>
							<td><? echo $kdm->makeInput('Surgery.Treatment'); ?></td>
						</tr>
					</table>
				</fieldSet>
				<fieldSet>
					<legend><label for="Surgery-PreSurgicalExams" name="Surgery-PreSurgicalExams">Surgery-PreSurgicalExams</label></legend>
					<table>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryRadiologicalExam" name="Surgery.RadiologicalExam">Surgery.RadiologicalExam</label></td>
							<td><? echo $kdm->makeInput('Surgery.RadiologicalExam'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBTTempF" name="Surgery.BTTempF">Surgery.BTTempF</label></td>
							<td><? echo $kdm->makeInput('Surgery.BTTempF'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBTSkin" name="Surgery.BTSkin">Surgery.BTSkin</label></td>
							<td><? echo $kdm->makeInput('Surgery.BTSkin'); ?></td>
						</tr><tr>
							<td><label for="SurgeryBTCough" name="Surgery.BTCough">Surgery.BTCough</label></td>
							<td><? echo $kdm->makeInput('Surgery.BTCough'); ?></td>
						</tr><tr>
							<td><label for="SurgeryOkForSurgery" name="Surgery.OkForSurgery">Surgery.OkForSurgery</label></td>
							<td><? echo $kdm->makeInput('Surgery.OkForSurgery'); ?></td>
						</tr><tr>
							<td><label for="SurgeryNeedTreatment" name="Surgery.NeedTreatment">Surgery.NeedTreatment</label></td>
							<td><? echo $kdm->makeInput('Surgery.NeedTreatment'); ?></td>
						</tr>
					</table>
				</fieldSet>
				<fieldSet>
					<legend><label for="Surgery-ParentAutorisation" name="Surgery-ParentAutorisation">Surgery-ParentAutorisation</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryPAOk" name="Surgery.PAOk">Surgery.PAOk</label></td>
							<td><? echo $kdm->makeInput('Surgery.PAOk'); ?></td>
						</tr><tr>
							<td><label for="SurgeryPASurgeon" name="Surgery.PASurgeon">Surgery.PASurgeon</label></td>
							<td><? echo $kdm->makeInput('Surgery.PASurgeon'); ?></td>
						</tr>
					</table>
				</fieldSet>
				<fieldSet>
					<legend><label for="Surgery-SurgicalReport" name="Surgery-SurgicalReport">Surgery-SurgicalReport</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryReportDate" name="Surgery.ReportDate">Surgery.ReportDate</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportDate'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportDiagnostic" name="Surgery.ReportDiagnostic">Diagnostic</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportDiagnostic'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportSurgeon" name="Surgery.ReportSurgeon">Surgery.ReportSurgeon</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportSurgeon'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportProcedure" name="Surgery.ReportProcedure">Surgery.ReportProcedure</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportProcedure'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportSideR" name="Surgery.ReportSideR">Surgery.ReportSideR</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportSideR'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportSideL" name="Surgery.ReportSideL">Surgery.ReportSideL</label></td>
							<td><? echo $kdm->makeInput('Surgery.ReportSideL'); ?></td>
						</tr><tr>
							<td><label for="SurgeryReportProcedure" name="Surgery.report_procedure">Surgery.report_procedure</label></td>
							<td><? echo $kdm->makeInput('Surgery.report_procedure'); ?></td>
						</tr>
					</table>
				</fieldSet>
				<fieldSet>
					<legend><label for="Surgery-HospitalisationFollowUp" name="Surgery-HospitalisationFollowUp">Surgery-HospitalisationFollowUp</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="SurgeryFollowUpComplication" name="Surgery.FollowUpComplication">Surgery.FollowUpComplication</label></td>
							<td><? echo $kdm->makeInput('Surgery.FollowUpComplication'); ?></td>
						</tr>
					</table>
				</fieldSet>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element("belongsTo"); ?></span>
			</td>
		</tr>
	</table>
</form>	
