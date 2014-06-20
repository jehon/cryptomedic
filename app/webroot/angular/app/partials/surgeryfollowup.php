<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<Legend><?php label("SurgeryFollowup-Discharge"); ?></Legend>
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
		<Legend><?php label("SurgeryFollowup-Visit"); ?></Legend>
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
		<Legend><?php label("SurgeryFollowup-Treatment"); ?></Legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<?php (new t("SurgeryFollowup.TreatmentPhysiotherapy"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOrthopedicDevice"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentPlaster"))->tr()->p(); ?>
			<?php (new t("SurgeryFollowup.TreatmentOther"))->tr()->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<Legend><?php label("SurgeryFollowup-Conclusion"); ?></Legend>
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
	