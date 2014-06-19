<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<?php 
	function price($item, $extra = "size=2") {
		// $struct = _parseKey($item);
		$name = explode(".", $item);
		$name = $name[1];
		echo "<tr ng-if='currentFile().$name > 0'>";
		echo "<td>";
		(new t($item))->label()->p();
		echo "</td>";
		echo "<td>";
		(new t($item, $extra))->value()->p();
		echo "</td>";
		echo "<td><div pricefor='$item'>{{currentFile().getPriceFor('$name')}}</div></td>";
		echo "<td>{{currentFile().getTotalFor('$name')}}</td>";
		echo "</tr>";
	}
?>
<div class="col-sm-6" ng-controller="ctrl_bill">
	<FieldSet>
		<legend><label for="Bill-GeneralData" name="Bill-GeneralData">General Data</label></legend>
		<table  class='colorize'>
			<?php price("Bill.Date"); ?>
			<?php price("Bill.ExaminerName"); ?>
			<?php price("Bill.Center"); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<legend><label for="Bill-Consults" name="Bill-Consults">Consultations</label></legend>
		<table  class='colorize'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<tr>
				<td></td>
				<td><?php (new t("Quantity"))->label()->p() ;?></td>
				<td><?php (new t("Price"))->label()->p() ;?></td>
				<td><?php (new t("Total"))->label()->p() ;?></td>
			</tr>
			<?php price("Bill.consult_CDC_consultation_physio"); ?>
			<?php price("Bill.consult_CDC_consultation_Bengali_Doctor", "size=2"); ?>
			<?php price("Bill.consult_field_visit", "size=2"); ?>
			<?php price("Bill.consult_home_visit", "size=2"); ?>
			<?php price("Bill.consult_give_appointment", "size=2"); ?>
			<?php price("Bill.consult_medecine", "size=2"); ?>
			<?php price("Bill.consult_vitamineD", "size=2"); ?>
			<?php price("Bill.consult_nutritionalAdvice", "size=2"); ?>
			<?php price("Bill.consult_nutritionalSupport", "size=2"); ?>
			<?php price("Bill.consult_making_plaster", "size=2"); ?>
			<?php price("Bill.consult_making_dressing", "size=2"); ?>
			<?php price("Bill.consult_group_physiotherapy"); ?>
			<?php price("Bill.consult_X_Ray"); ?>
			<?php price("Bill.consult_physiotherapy"); ?>
			<?php price("Bill.consult_Other_consultation_care", "size=6"); ?></td>
		</table>
	</FieldSet>
	<FieldSet>
		<legend><label for="Bill-Workshop" name="Bill-Workshop">Workshop</label></legend>
		<table  class='colorize'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<tr>
				<td></td>
				<td><?php (new t("Quantity"))->label()->p() ;?></td>
				<td><?php (new t("Price"))->label()->p() ;?></td>
				<td><?php (new t("Total"))->label()->p() ;?></td>
			</tr>
			<?php price("Bill.workshop_BHKAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_BHKAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_UHKAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_UHKAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_BKAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_BKAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_UKAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_UKAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_Knee_brace", "size=2"); ?>
			<?php price("Bill.workshop_BAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_BAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_UAFO_night", "size=2"); ?>
			<?php price("Bill.workshop_UAFO_walking", "size=2"); ?>
			<?php price("Bill.workshop_Orthoshoes_with_bar", "size=2"); ?>
			<?php price("Bill.workshop_Orthoshoes_without_bar", "size=2"); ?>
			<?php price("Bill.workshop_DDB_splint", "size=2"); ?>
			<?php price("Bill.workshop_Compensation_sole", "size=2"); ?>
			<?php price("Bill.workshop_Arch_support", "size=2"); ?>
			<?php price("Bill.workshop_Matetarsal_pade", "size=2"); ?>
			<?php price("Bill.workshop_Supinator_corner", "size=2"); ?>
			<?php price("Bill.workshop_Wirst_splint", "size=2"); ?>
			<?php price("Bill.workshop_Hand_splint", "size=2"); ?>
			<?php price("Bill.workshop_Finger_splint", "size=2"); ?>
			<?php price("Bill.workshop_Walker_with_wheel", "size=2"); ?>
			<?php price("Bill.workshop_Walker_without_wheel", "size=2"); ?>
			<?php price("Bill.workshop_Crutch_a_pair", "size=2"); ?>
			<?php price("Bill.workshop_Crutch_a_piece", "size=2"); ?>
			<?php price("Bill.workshop_crutch_alumenium", "size=2"); ?>
			<?php price("Bill.workshop_Wheel_chair", "size=2"); ?>
			<?php price("Bill.workshop_chair_china", "size=2"); ?>
			<?php price("Bill.workshop_CP_chair", "size=2"); ?>
			<?php price("Bill.workshop_CP_standing_table", "size=2"); ?>
			<?php price("Bill.workshop_Cervical_Collar", "size=2"); ?>
			<?php price("Bill.workshop_Abdominal_corset_belt", "size=2"); ?>
			<?php price("Bill.workshop_Reparing", "size=2"); ?>
			<?php price("Bill.workshop_mailwalke_brace", "size=2"); ?>
			<?php price("Bill.workshop_leg_truction", "size=2"); ?>
			<?php price("Bill.workshop_thoracic_brace", "size=2"); ?>
			<?php price("Bill.workshop_samainto_brace", "size=2"); ?>
			<?php price("Bill.workshop_fracture_brace", "size=2"); ?>
			<?php price("Bill.workshop_smo", "size=2"); ?>
			<?php price("Bill.workshop_lifspring_afo", "size=2"); ?>
			<?php price("Bill.workshop_Other_orthodevice", "size=6"); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<legend><label for="Bill-Surgery" name="Bill-Surgery">Surgery</label></legend>
		<table  class='colorize'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<tr>
				<td></td>
				<td><?php (new t("Quantity"))->label()->p() ;?></td>
				<td><?php (new t("Price"))->label()->p() ;?></td>
				<td><?php (new t("Total"))->label()->p() ;?></td>
			</tr>
			<?php price("Bill.surgical_osteotomy", "size=2"); ?>
			<?php price("Bill.surgical_osteotomy_bi", "size=2"); ?>
			<?php price("Bill.surgical_epiphysiodesis", "size=2"); ?>
			<?php price("Bill.surgical_epiphysiodesis_bi", "size=2"); ?>
			<?php price("Bill.surgical_polio_AL", "size=2"); ?>
			<?php price("Bill.surgical_polio_achileus_Achileus_lenthening_bi", "size=2"); ?>
			<?php price("Bill.surgical_percutaneous_AL_club_foot", "size=2"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_bi_cmosh", "size=2"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_uni_cdc", "size=2"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_bi_cdc", "size=2"); ?>
			<?php price("Bill.surgical_PMR_club_foot", "size=2"); ?>
			<?php price("Bill.surgical_PMR_club_club_foot_bi", "size=2"); ?>
			<?php price("Bill.surgical_Burn_release", "size=2"); ?>
			<?php price("Bill.surgical_burn_little_release", "size=2"); ?>
			<?php price("Bill.surgical_Pin_removal", "size=2"); ?>
			<?php price("Bill.surgical_other_operation", "size=6"); ?>
		</table>
	</FieldSet>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<FieldSet>
		<legend><label for="Bill-Total" name="Bill-Total">Total</label></legend>
		<table  class='colorize'>
			<col width='70%' /><col width='*' /> 
			<tr>
				<td></td>
				<td modes='add edit'><a class='textbutton' ng-clic="calculate()">
						<img src='img/calculate.gif' alt='[calculate]'>
						Calculate
					</a></td>
			</tr><tr>
				<td><?php (new t("Bill.total_real"))->label()->p(); ?></td>
				<td id='total_real'>{{total_real()}}</td>
			</tr>
			<?php (new t("Bill.Sociallevel", "size=2"))->tr()->p(); ?>
			<?php (new t("Bill.total_asked", "size=2"))->tr()->p(); ?>
			<?php (new t("Bill.total_paid", "size=2"))->tr()->p(); ?>
		</table>
	</FieldSet>
</div>