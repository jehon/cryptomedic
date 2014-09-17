<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-lg-6">
<!--
 	<fieldset>
		<legend>Order</legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php //(new t("Surgery.Operation"))->tr()->p(); ?>
			<?php //(new t("Surgery.TransferChittagong"))->tr()->p(); ?>
			<?php //(new t("Surgery.Date"))->tr()->p(); ?>
		</table>
	</fieldSet>
 	<fieldSet>
		<legend>General Examination</legend>
		<table>
			<?php //(new t("Surgery.MedicalProblem"))->tr()->p(); ?>
			<?php //(new t("Surgery.BleedingExecive"))->tr()->p(); ?>
			<?php //(new t("Surgery.GeneralCondition"))->tr()->p(); ?>
			<?php //(new t("Surgery.Weight"))->tr()->p(); ?>
			<?php //(new t("Surgery.Heightcm"))->tr()->p(); ?>
			<?php //(new t("Surgery.TemperatureF"))->tr()->p(); ?>
			<?php //(new t("Surgery.Pulsemin"))->tr()->p(); ?>
			<?php //(new t("Surgery.BloodPresureH"))->tr()->p(); ?>
			<?php //(new t("Surgery.BloodPresureL"))->tr()->p(); ?>
			<?php //(new t("Surgery.HeartAuscultation"))->tr()->p(); ?>
			<?php //(new t("Surgery.ChestAuscultation"))->tr()->p(); ?>
			<?php //(new t("Surgery.Skin"))->tr()->p(); ?>
			<?php //(new t("Surgery.MouthAndTeeth"))->tr()->p(); ?>
			<?php //(new t("Surgery.Worms"))->tr()->p(); ?>
			<?php //(new t("Surgery.Treatment"))->tr()->p(); ?>
		</table>
	</fieldSet>
 	<fieldSet>
		<legend>Pre-Surgical Exams</legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php //(new t("Surgery.RadiologicalExam"))->tr()->p(); ?>
			<?php //(new t("Surgery.BTTempF"))->tr()->p(); ?>
			<?php //(new t("Surgery.BTSkin"))->tr()->p(); ?>
			<?php //(new t("Surgery.BTCough"))->tr()->p(); ?>
			<?php //(new t("Surgery.OkForSurgery"))->tr()->p(); ?>
			<?php //(new t("Surgery.NeedTreatment"))->tr()->p(); ?>
		</table>
	</fieldSet>
	<fieldSet>
		<legend>Parent Autorisation</legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php //(new t("Surgery.PAOk"))->tr()->p(); ?>
			<?php //(new t("Surgery.PASurgeon"))->tr()->p(); ?>
		</table>
	</fieldSet>
-->
	<fieldSet>
		<legend>Surgical Report</legend>
		<table>
			<?php (new t("Surgery.ReportDate"))->tr()->p(); ?>
			<?php (new t("Surgery.ReportDiagnostic"))->tr()->p(); ?>
			<?php (new t("Surgery.ReportSurgeon"))->tr()->p(); ?>
			<?php //(new t("Surgery.ReportProcedure"))->tr()->p(); ?>
			<?php (new t("Surgery.ReportSideR"))->tr()->p(); ?>
			<?php (new t("Surgery.ReportSideL"))->tr()->p(); ?>
			<?php (new t("Surgery.report_procedure"))->tr()->p(); ?>
		</table>
	</fieldSet>
	<fieldSet>
		<legend>Hospitalisation Follow-Up</legend>
		<table>
			<?php (new t("Surgery.FollowUpComplication"))->tr()->p(); ?>
		</table>
	</fieldSet>
</div>
<div class="col-lg-6">
	<div ng-include="'/rest/templates/patient-related.html'"></div>
</div>	