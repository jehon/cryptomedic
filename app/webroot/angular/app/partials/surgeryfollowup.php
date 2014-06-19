<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Discharge" name="SurgeryFollowup-Discharge">SurgeryFollowup-Discharge</label></Legend>
		<table class='colorize'>
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
		<Legend><label for="SurgeryFollowup-Visit" name="SurgeryFollowup-Visit">SurgeryFollowup-Visit</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.SkinCicatrisation"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.BoneConsolidation"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.DeformityAxis"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ArticulationMobility"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.WalkingDifficulties"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Treatment" name="SurgeryFollowup-Treatment">SurgeryFollowup-Treatment</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.TreatmentPhysiotherapy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOrthopedicDevice"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentPlaster"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOther"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><label for="SurgeryFollowup-Conclusion" name="SurgeryFollowup-Conclusion">SurgeryFollowup-Conclusion</label></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.ResultImprovement"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ResultFamilyHappy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.ResultChildrenHappy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.NextAppointment"))->tr()->p(); ?>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
</div>
	