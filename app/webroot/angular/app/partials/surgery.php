<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<fieldset>
		<legend><label for="Surgery-Order" name="Surgery-Order">Surgery-Order</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.Operation");?></td>
				<td><?php value("Surgery.Operation"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.TransferChittagong");?></td>
				<td><?php value("Surgery.TransferChittagong"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Date");?></td>
				<td><?php value("Surgery.Date"); ?></td>
			</tr>
		</table>
	</fieldSet>
	<fieldSet>
		<legend><label for="Surgery-GeneralExamination" name="Surgery-GeneralExamination">Surgery-GeneralExamination</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.MedicalProblem");?></td>
				<td><?php value("Surgery.MedicalProblem"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BleedingExecive");?></td>
				<td><?php value("Surgery.BleedingExecive"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.GeneralCondition");?></td>
				<td><?php value("Surgery.GeneralCondition"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Weight");?></td>
				<td><?php value("Surgery.Weight"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Heightcm");?></td>
				<td><?php value("Surgery.Heightcm"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.TemperatureF");?></td>
				<td><?php value("Surgery.TemperatureF"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Pulsemin");?></td>
				<td><?php value("Surgery.Pulsemin"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BloodPresureH");?></td>
				<td><?php value("Surgery.BloodPresureH"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BloodPresureL");?></td>
				<td><?php value("Surgery.BloodPresureL"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.HeartAuscultation");?></td>
				<td><?php value("Surgery.HeartAuscultation"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ChestAuscultation");?></td>
				<td><?php value("Surgery.ChestAuscultation"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Skin");?></td>
				<td><?php value("Surgery.Skin"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.MouthAndTeeth");?></td>
				<td><?php value("Surgery.MouthAndTeeth"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Worms");?></td>
				<td><?php value("Surgery.Worms"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.Treatment");?></td>
				<td><?php value("Surgery.Treatment"); ?></td>
			</tr>
		</table>
	</fieldSet>
	<fieldSet>
		<legend><label for="Surgery-PreSurgicalExams" name="Surgery-PreSurgicalExams">Surgery-PreSurgicalExams</label></legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.RadiologicalExam");?></td>
				<td><?php value("Surgery.RadiologicalExam"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BTTempF");?></td>
				<td><?php value("Surgery.BTTempF"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BTSkin");?></td>
				<td><?php value("Surgery.BTSkin"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.BTCough");?></td>
				<td><?php value("Surgery.BTCough"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.OkForSurgery");?></td>
				<td><?php value("Surgery.OkForSurgery"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.NeedTreatment");?></td>
				<td><?php value("Surgery.NeedTreatment"); ?></td>
			</tr>
		</table>
	</fieldSet>
	<fieldSet>
		<legend><label for="Surgery-ParentAutorisation" name="Surgery-ParentAutorisation">Surgery-ParentAutorisation</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.PAOk");?></td>
				<td><?php value("Surgery.PAOk"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.PASurgeon");?></td>
				<td><?php value("Surgery.PASurgeon"); ?></td>
			</tr>
		</table>
	</fieldSet>
	<fieldSet>
		<legend><label for="Surgery-SurgicalReport" name="Surgery-SurgicalReport">Surgery-SurgicalReport</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.ReportDate");?></td>
				<td><?php value("Surgery.ReportDate"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ReportDiagnostic");?></td>
				<td><?php value("Surgery.ReportDiagnostic"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ReportSurgeon");?></td>
				<td><?php value("Surgery.ReportSurgeon"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ReportProcedure");?></td>
				<td><?php value("Surgery.ReportProcedure"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ReportSideR");?></td>
				<td><?php value("Surgery.ReportSideR"); ?></td>
			</tr><tr>
				<td><?php label("Surgery.ReportSideL");?></td>
				<td><?php value("Surgery.ReportSideL"); ?></td>
			</tr><tr>
				<td><label for="SurgeryReportProcedure" name="Surgery.report_procedure">Surgery.report_procedure</label></td>
				<td><?php value("Surgery.report_procedure"); ?></td>
			</tr>
		</table>
	</fieldSet>
	<fieldSet>
		<legend><label for="Surgery-HospitalisationFollowUp" name="Surgery-HospitalisationFollowUp">Surgery-HospitalisationFollowUp</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("Surgery.FollowUpComplication");?></td>
				<td><?php value("Surgery.FollowUpComplication"); ?></td>
			</tr>
		</table>
	</fieldSet>
</div>
<div class="col-sm-6">
		<div ng-include="'partials/patient_summary.php'"></div>
</div>	