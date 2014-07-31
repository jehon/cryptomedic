<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class="col-lg-6">
	<FieldSet>
		<Legend>Discharge</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.Date"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.Examiner"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.Paracetamol"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ParacetamolDays"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.cloxacilline"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.CloxacillineDays"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.Calcium"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.CalciumDays"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.CodLiverOil"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.StitchOffDate"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.PlasterDays"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentAfterPlasterWalkingBrace"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentAfterPlasterOrthopedicShoes"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentAfterPlasterNightSplint"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentAfterPlasterPhysioTherapy"))->tr()->p(); ?>	
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Visit</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.SkinCicatrisation"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.BoneConsolidation"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.DeformityAxis"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ArticulationMobility"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.WalkingDifficulties"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Treatment</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.TreatmentPhysiotherapy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOrthopedicDevice"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentPlaster"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOther"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend>Conclusion</Legend>
		<table>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.ResultImprovement"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ResultFamilyHappy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ResultChildrenHappy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.NextAppointment"))->tr()->p(); ?>
		</table>
	</FieldSet>
</div>
<div class="col-lg-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>
	