<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<?php 
	function price($item, $size = 2) {
		$name = explode(".", $item);
		$name = $name[1];
		echo "<tr "
			. "ng-if=\"currentFile().getPriceFor('$name') > 0\" "
			. "ng-class='{ notModeRead: !currentFile().$name }'"
			. ">";
		echo "<td>" 
			. str_replace("_", " ", substr($item, strpos($item, '_') + 1)) 
			. "</td>";
		echo "<td>";
		(new t($item, [ "inline" => "style='width: 4em' step=1 min=0" ]))->value()->p();
		echo "</td>";
		echo "<td><div pricefor='$item'>{{currentFile().getPriceFor('$name')}}</div></td>";
		echo "<td>{{currentFile().getTotalFor('$name')}}</td>";
		echo "</tr>";
	}
?>
<div class="col-lg-6">
	<FieldSet>
		<legend>General data</legend>
		<table>
			<?php (new t("Bill.Date"))->tr()->p(); ?>
			<?php (new t("Bill.ExaminerName"))->tr("Examiner")->p(); ?>
			<?php (new t("Bill.Center"))->tr("Center where consultation took place")->p(); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<legend>Consultation items</legend>
		<table  class='prices'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<thead>
				<td></td>
				<td>Quantity</td>
				<td>Price</td>
				<td>Total</td>
			</thead>
			<?php price("Bill.consult_CDC_consultation_physio"); ?>
			<?php price("Bill.consult_CDC_consultation_Bengali_Doctor"); ?>
			<?php price("Bill.consult_field_visit"); ?>
			<?php price("Bill.consult_home_visit"); ?>
			<?php price("Bill.consult_give_appointment"); ?>
			<?php price("Bill.consult_medecine"); ?>
			<?php price("Bill.consult_vitamineD"); ?>
			<?php price("Bill.consult_nutritionalAdvice"); ?>
			<?php price("Bill.consult_nutritionalSupport"); ?>
			<?php price("Bill.consult_making_plaster"); ?>
			<?php price("Bill.consult_making_dressing"); ?>
			<?php price("Bill.consult_group_physiotherapy"); ?>
			<?php price("Bill.consult_X_Ray"); ?>
			<?php price("Bill.consult_physiotherapy"); ?>
			<?php price("Bill.consult_Other_consultation_care", 6); ?></td>
		</table>
	</FieldSet>
	<FieldSet>
		<legend>Workshop items</legend>
		<table  class='prices'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<thead>
				<td></td>
				<td>Quantity</td>
				<td>Price</td>
				<td>Total</td>
			</thead>
			<?php price("Bill.workshop_BHKAFO_night"); ?>
			<?php price("Bill.workshop_BHKAFO_walking"); ?>
			<?php price("Bill.workshop_UHKAFO_night"); ?>
			<?php price("Bill.workshop_UHKAFO_walking"); ?>
			<?php price("Bill.workshop_BKAFO_night"); ?>
			<?php price("Bill.workshop_BKAFO_walking"); ?>
			<?php price("Bill.workshop_UKAFO_night"); ?>
			<?php price("Bill.workshop_UKAFO_walking"); ?>
			<?php price("Bill.workshop_Knee_brace"); ?>
			<?php price("Bill.workshop_BAFO_night"); ?>
			<?php price("Bill.workshop_BAFO_walking"); ?>
			<?php price("Bill.workshop_UAFO_night"); ?>
			<?php price("Bill.workshop_UAFO_walking"); ?>
			<?php price("Bill.workshop_Orthoshoes_with_bar"); ?>
			<?php price("Bill.workshop_Orthoshoes_without_bar"); ?>
			<?php price("Bill.workshop_DDB_splint"); ?>
			<?php price("Bill.workshop_Compensation_sole"); ?>
			<?php price("Bill.workshop_Arch_support"); ?>
			<?php price("Bill.workshop_Matetarsal_pade"); ?>
			<?php price("Bill.workshop_Supinator_corner"); ?>
			<?php price("Bill.workshop_Wirst_splint"); ?>
			<?php price("Bill.workshop_Hand_splint"); ?>
			<?php price("Bill.workshop_Finger_splint"); ?>
			<?php price("Bill.workshop_Walker_with_wheel"); ?>
			<?php price("Bill.workshop_Walker_without_wheel"); ?>
			<?php price("Bill.workshop_Crutch_a_pair"); ?>
			<?php price("Bill.workshop_Crutch_a_piece"); ?>
			<?php price("Bill.workshop_crutch_alumenium"); ?>
			<?php price("Bill.workshop_Wheel_chair"); ?>
			<?php price("Bill.workshop_chair_china"); ?>
			<?php price("Bill.workshop_CP_chair"); ?>
			<?php price("Bill.workshop_CP_standing_table"); ?>
			<?php price("Bill.workshop_Cervical_Collar"); ?>
			<?php price("Bill.workshop_Abdominal_corset_belt"); ?>
			<?php price("Bill.workshop_Reparing"); ?>
			<?php price("Bill.workshop_mailwalke_brace"); ?>
			<?php price("Bill.workshop_leg_truction"); ?>
			<?php price("Bill.workshop_thoracic_brace"); ?>
			<?php price("Bill.workshop_samainto_brace"); ?>
			<?php price("Bill.workshop_fracture_brace"); ?>
			<?php price("Bill.workshop_smo"); ?>
			<?php price("Bill.workshop_lifspring_afo"); ?>
			<?php price("Bill.workshop_Other_orthodevice", 6); ?>
		</table>
	</FieldSet>
	<FieldSet>
		<legend>Surgery items</legend>
		<table  class='prices'>
			<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
			<thead>
				<td></td>
				<td>Quantity</td>
				<td>Price</td>
				<td>Total</td>
			</thead>
			<?php price("Bill.surgical_osteotomy"); ?>
			<?php price("Bill.surgical_osteotomy_bi"); ?>
			<?php price("Bill.surgical_epiphysiodesis"); ?>
			<?php price("Bill.surgical_epiphysiodesis_bi"); ?>
			<?php price("Bill.surgical_polio_AL"); ?>
			<?php price("Bill.surgical_polio_achileus_Achileus_lenthening_bi"); ?>
			<?php price("Bill.surgical_percutaneous_AL_club_foot"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_bi_cmosh"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_uni_cdc"); ?>
			<?php price("Bill.surgical_percutaneous_achil_tenotomy_bi_cdc"); ?>
			<?php price("Bill.surgical_PMR_club_foot"); ?>
			<?php price("Bill.surgical_PMR_club_club_foot_bi"); ?>
			<?php price("Bill.surgical_Burn_release"); ?>
			<?php price("Bill.surgical_burn_little_release"); ?>
			<?php price("Bill.surgical_Pin_removal"); ?>
			<?php price("Bill.surgical_other_operation", 6); ?>
		</table>
	</FieldSet>
</div>
<div class="col-lg-6">
	<div ng-include="'partials/patient-related.php'"></div>
	<FieldSet>
		<legend>Summary</legend>
		<table>
			<col width='70%' /><col width='*' /> 
			<tr>
				<td>Raw Calculated total</td>
				<td>{{currentFile().calculate_total_real()}}</td>
			</tr>
			<?php (new t("Bill.Sociallevel"))->tr("Social Level")->p(); ?>
            <tr>
				<td>Percentage of price to be asked</td>
				<td>{{currentFile().calculate_percentage_asked() | mypercentage:1 }}</td>
			</tr>
            <tr>
				<td>Price to be asked to the patient</td>
				<td>{{currentFile().calculate_total_asked() | number:0}}</td>
			</tr>
		</table>
	</FieldSet>
</div>