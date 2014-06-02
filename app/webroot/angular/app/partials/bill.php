<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<?php 
	function price($item, $extra = "size=2") {
		$struct = _parseKey($item);
		echo "<tr ng-if='currentFile()." . $struct->name . " > 0'>";
		echo "<td>";
		label($item);
		echo "</td>";
		echo "<td>";
		value($item, $extra);
		echo "</td>";
		echo "<td><div pricefor='$item'>{{currentFile().getPriceFor('" . $struct->name . "')}}</div></td>";
		echo "<td>{{currentFile().getTotalFor('" . $struct->name . "')}}</td>";
		echo "</tr>";
	}
?>
<div class="col-sm-6" ng-controller="ctrl_bill">
	<FieldSet>
		<legend><label for="Bill-GeneralData" name="Bill-GeneralData">General Data</label></legend>
		<table  class='colorize'>
			<tr>
				<td><?php label("Bill.Date");?></td>
				<td><?php value("Bill.Date"); ?></td>
			</tr><tr>
				<td><?php label("Bill.ExaminerName");?></td>
				<td><?php value("Bill.ExaminerName"); ?></td>
			</tr><tr>
				<td><?php label("Bill.Center");?></td>
				<td><?php value("Bill.Center"); ?></td>
			</tr>
		</table>
	</FieldSet>
	<FieldSet>
		<legend><label for="Bill-Consults" name="Bill-Consults">Consultations</label></legend>
		<table  class='colorize'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<tr>
				<td></td>
				<td><?php label("Quantity");?></td>
				<td><?php label("Price");?></td>
				<td><?php label("Total");?></td>
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
				<td><?php label("Quantity");?></td>
				<td><?php label("Price");?></td>
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
				<td><?php label("Quantity");?></td>
				<td><?php label("Price");?></td>
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
	<div ng-include="'partials/patient_summary.php'"></div>
	<FieldSet>
		<legend><label for="Bill-Total" name="Bill-Total">Total</label></legend>
		<table  class='colorize'>
			<col width='70%' /><col width='*' /> 
			<tr>
				<td></td>
				<td modes='add edit'><a class='textbutton' href="javascript:cryptomedic.businessrules.billcalculate();">
						<img src='/amd/cryptomedic/img/calculate.gif' alt='[calculate]'>
						Calculate
					</a></td>
			</tr><tr>
				<td><label for="BillTotalReal" name="Bill.total_real">Total real</label></td>
				<td id='total_real'>{@read header="Bill.total_real"/}</td>
					<input type="hidden" name="data[total_real]" value="{total_real}" id="BillTotalReal" />
			</tr><tr>
				<td><?php label("Bill.SocialLevel");?></td>
				<td><?php value("Bill.Sociallevel"); ?></td>
			</tr>
            <tr>
				<td><label for="BillTotalAsked" name="Bill.total_asked">Total asked</label></td>
				<td id='total_asked'>{@read header="Bill.total_asked"/}</td>
				<input type="hidden" name="data[total_asked]" value="{total_asked}" id="BillTotalAsked" />
			</tr><tr>
				<td><label for="BillTotalPaid" name="Bill.total_paid">Bill.total_paid</label></td>
				<td><?php value("Bill.total_paid"); ?></td>
			</tr>
		</table>
	</FieldSet>
</div>