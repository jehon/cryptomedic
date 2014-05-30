<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<FieldSet>
		<legend><label for="Bill-GeneralData" name="Bill-GeneralData">General Data</label></legend>
		<table  class='colorize'>
			<tr>
				<td><?php label("Bill.Date");?></td>
				<td>{@input header="Bill.Date"/}</td>
			</tr><tr>
				<td><?php label("Bill.ExaminerName");?></td>
				<td>{@input header="Bill.ExaminerName"/}</td>
			</tr><tr>
				<td><?php label("Bill.Center");?></td>
				<td>{@input header="Bill.Center"/}</td>
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
			</tr><tr>
				<td>Bill.consult_CDC_consultation_physio</td>
				<td>{@input header="Bill.consult_CDC_consultation_physio" extra="size=2"/}</td>
				<td><div pricefor='consult_CDC_consultation_physio'>...</div></td>
			</tr><tr>
				<td>Bill.consult_CDC_consultation_Bengali_Doctor</td>
				<td>{@input header="Bill.consult_CDC_consultation_Bengali_Doctor" extra="size=2"/}</td>
				<td><div pricefor='consult_CDC_consultation_Bengali_Doctor'>...</div></td>
			</tr><tr>
				<td>Bill.consult_field_visit</td>
				<td>{@input header="Bill.consult_field_visit" extra="size=2"/}</td>
				<td><div pricefor='consult_field_visit'>...</div></td>
			</tr><tr>
				<td>Bill.consult_home_visit</td>
				<td>{@input header="Bill.consult_home_visit" extra="size=2"/}</td>
				<td><div pricefor='consult_home_visit'>...</div></td>
			</tr><tr>
				<td>Bill.consult_give_appointment</td>
				<td>{@input header="Bill.consult_give_appointment" extra="size=2"/}</td>
				<td><div pricefor='consult_give_appointment'>...</div></td>
			</tr><tr>
				<td>Bill.consult_medecine</td>
				<td>{@input header="Bill.consult_medecine" extra="size=2"/}</td>
				<td><div pricefor='consult_medecine'>...</div></td>
			</tr><tr>
				<td>Bill.consult_vitamineD</td>
				<td>{@input header="Bill.consult_vitamineD" extra="size=2"/}</td>
				<td><div pricefor='consult_vitamineD'>...</div></td>
			</tr><tr>
				<td>Bill.consult_nutritionalAdvice</td>
				<td>{@input header="Bill.consult_nutritionalAdvice" extra="size=2"/}</td>
				<td><div pricefor='consult_nutritionalAdvice'>...</div></td>
			</tr><tr>
				<td>Bill.consult_nutritionalSupport</td>
				<td>{@input header="Bill.consult_nutritionalSupport" extra="size=2"/}</td>
				<td><div pricefor='consult_nutritionalSupport'>...</div></td>
			</tr><tr>
				<td>Bill.consult_making_plaster</td>
				<td>{@input header="Bill.consult_making_plaster" extra="size=2"/}</td>
				<td><div pricefor='consult_making_plaster'>...</div></td>
			</tr><tr>
				<td>Bill.consult_making_dressing</td>
				<td>{@input header="Bill.consult_making_dressing" extra="size=2"/}</td>
				<td><div pricefor='consult_making_dressing'>...</div></td>
			</tr><tr>
				<td>Bill.consult_group_physiotherapy</td>
				<td>{@input header="Bill.consult_group_physiotherapy" extra="size=2"/}</td>
				<td><div pricefor='consult_group_physiotherapy'>...</div></td>
			</tr><tr>
				<td>Bill.consult_X_Ray</td>
				<td>{@input header="Bill.consult_X_Ray" extra="size=2"/}</td>
				<td><div pricefor='consult_X_Ray'>...</div></td>
			</tr><tr>
				<td>Bill.consult_physiotherapy</td>
				<td>{@input header="Bill.consult_physiotherapy" extra="size=2"/}</td>
				<td><div pricefor='consult_physiotherapy'>...</div></td>
			</tr><tr>
				<td>Bill.consult_Other_consultation_care</td>
				<td>{@input header="Bill.consult_Other_consultation_care" extra="%20size%3D6"/}</td>
				<td><div pricefor='consult_Other_consultation_care'>...</div></td>
			</tr>
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
			</tr><tr>
				<td>Bill.workshop_BHKAFO_night</td>
				<td>{@input header="Bill.workshop_BHKAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_BHKAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_BHKAFO_walking</td>
				<td>{@input header="Bill.workshop_BHKAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_BHKAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UHKAFO_night</td>
				<td>{@input header="Bill.workshop_UHKAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_UHKAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UHKAFO_walking</td>
				<td>{@input header="Bill.workshop_UHKAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_UHKAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_BKAFO_night</td>
				<td>{@input header="Bill.workshop_BKAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_BKAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_BKAFO_walking</td>
				<td>{@input header="Bill.workshop_BKAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_BKAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UKAFO_night</td>
				<td>{@input header="Bill.workshop_UKAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_UKAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UKAFO_walking</td>
				<td>{@input header="Bill.workshop_UKAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_UKAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Knee_brace</td>
				<td>{@input header="Bill.workshop_Knee_brace" extra="size=2"/}</td>
				<td><div pricefor='workshop_Knee_brace'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_BAFO_night</td>
				<td>{@input header="Bill.workshop_BAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_BAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_BAFO_walking</td>
				<td>{@input header="Bill.workshop_BAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_BAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UAFO_night</td>
				<td>{@input header="Bill.workshop_UAFO_night" extra="size=2"/}</td>
				<td><div pricefor='workshop_UAFO_night'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_UAFO_walking</td>
				<td>{@input header="Bill.workshop_UAFO_walking" extra="size=2"/}</td>
				<td><div pricefor='workshop_UAFO_walking'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Orthoshoes_with_bar</td>
				<td>{@input header="Bill.workshop_Orthoshoes_with_bar" extra="size=2"/}</td>
				<td><div pricefor='workshop_Orthoshoes_with_bar'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Orthoshoes_without_bar</td>
				<td>{@input header="Bill.workshop_Orthoshoes_without_bar" extra="size=2"/}</td>
				<td><div pricefor='workshop_Orthoshoes_without_bar'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_DDB_splint</td>
				<td>{@input header="Bill.workshop_DDB_splint" extra="size=2"/}</td>
				<td><div pricefor='workshop_DDB_splint'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Compensation_sole</td>
				<td>{@input header="Bill.workshop_Compensation_sole" extra="size=2"/}</td>
				<td><div pricefor='workshop_Compensation_sole'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Arch_support</td>
				<td>{@input header="Bill.workshop_Arch_support" extra="size=2"/}</td>
				<td><div pricefor='workshop_Arch_support'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Matetarsal_pade</td>
				<td>{@input header="Bill.workshop_Matetarsal_pade" extra="size=2"/}</td>
				<td><div pricefor='workshop_Matetarsal_pade'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Supinator_corner</td>
				<td>{@input header="Bill.workshop_Supinator_corner" extra="size=2"/}</td>
				<td><div pricefor='workshop_Supinator_corner'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Wirst_splint</td>
				<td>{@input header="Bill.workshop_Wirst_splint" extra="size=2"/}</td>
				<td><div pricefor='workshop_Wirst_splint'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Hand_splint</td>
				<td>{@input header="Bill.workshop_Hand_splint" extra="size=2"/}</td>
				<td><div pricefor='workshop_Hand_splint'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Finger_splint</td>
				<td>{@input header="Bill.workshop_Finger_splint" extra="size=2"/}</td>
				<td><div pricefor='workshop_Finger_splint'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Walker_with_wheel</td>
				<td>{@input header="Bill.workshop_Walker_with_wheel" extra="size=2"/}</td>
				<td><div pricefor='workshop_Walker_with_wheel'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Walker_without_wheel</td>
				<td>{@input header="Bill.workshop_Walker_without_wheel" extra="size=2"/}</td>
				<td><div pricefor='workshop_Walker_without_wheel'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Crutch_a_pair</td>
				<td>{@input header="Bill.workshop_Crutch_a_pair" extra="size=2"/}</td>
				<td><div pricefor='workshop_Crutch_a_pair'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Crutch_a_piece</td>
				<td>{@input header="Bill.workshop_Crutch_a_piece" extra="size=2"/}</td>
				<td><div pricefor='workshop_Crutch_a_piece'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_crutch_alumenium</td>
				<td>{@input header="Bill.workshop_crutch_alumenium" extra="size=2"/}</td>
				<td><div pricefor='workshop_crutch_alumenium'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Wheel_chair</td>
				<td>{@input header="Bill.workshop_Wheel_chair" extra="size=2"/}</td>
				<td><div pricefor='workshop_Wheel_chair'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_chair_china</td>
				<td>{@input header="Bill.workshop_chair_china" extra="size=2"/}</td>
				<td><div pricefor='workshop_chair_china'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_CP_chair</td>
				<td>{@input header="Bill.workshop_CP_chair" extra="size=2"/}</td>
				<td><div pricefor='workshop_CP_chair'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_CP_standing_table</td>
				<td>{@input header="Bill.workshop_CP_standing_table" extra="size=2"/}</td>
				<td><div pricefor='workshop_CP_standing_table'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Cervical_Collar</td>
				<td>{@input header="Bill.workshop_Cervical_Collar" extra="size=2"/}</td>
				<td><div pricefor='workshop_Cervical_Collar'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Abdominal_corset_belt</td>
				<td>{@input header="Bill.workshop_Abdominal_corset_belt" extra="size=2"/}</td>
				<td><div pricefor='workshop_Abdominal_corset_belt'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Reparing</td>
				<td>{@input header="Bill.workshop_Reparing" extra="size=2"/}</td>
				<td><div pricefor='workshop_Reparing'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_mailwalke_brace</td>
				<td>{@input header="Bill.workshop_mailwalke_brace" extra="size=2"/}</td>
				<td><div pricefor='workshop_mailwalke_brace'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_leg_truction</td>
				<td>{@input header="Bill.workshop_leg_truction" extra="size=2"/}</td>
				<td><div pricefor='workshop_leg_truction'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_thoracic_brace</td>
				<td>{@input header="Bill.workshop_thoracic_brace" extra="size=2"/}</td>
				<td><div pricefor='workshop_thoracic_brace'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_samainto_brace</td>
				<td>{@input header="Bill.workshop_samainto_brace" extra="size=2"/}</td>
				<td><div pricefor='workshop_samainto_brace'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_fracture_brace</td>
				<td>{@input header="Bill.workshop_fracture_brace" extra="size=2"/}</td>
				<td><div pricefor='workshop_fracture_brace'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_smo</td>
				<td>{@input header="Bill.workshop_smo" extra="size=2"/}</td>
				<td><div pricefor='workshop_smo'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_lifspring_afo</td>
				<td>{@input header="Bill.workshop_lifspring_afo" extra="size=2"/}</td>
				<td><div pricefor='workshop_lifspring_afo'>...</div></td>
			</tr><tr>
				<td>Bill.workshop_Other_orthodevice</td>
				<td>{@input header="Bill.workshop_Other_orthodevice" extra="size=2"/}</td>
				<td><div pricefor='workshop_Other_orthodevice'>...</div></td>
			</tr>
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
			</tr><tr>
				<td>Bill.surgical_osteotomy</td>
				<td>{@input header="Bill.surgical_osteotomy" extra="size=2"/}</td>
				<td><div pricefor='surgical_osteotomy'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_osteotomy_bi</td>
				<td>{@input header="Bill.surgical_osteotomy_bi" extra="size=2"/}</td>
				<td><div pricefor='surgical_osteotomy_bi'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_epiphysiodesis</td>
				<td>{@input header="Bill.surgical_epiphysiodesis" extra="size=2"/}</td>
				<td><div pricefor='surgical_epiphysiodesis'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_epiphysiodesis_bi</td>
				<td>{@input header="Bill.surgical_epiphysiodesis_bi" extra="size=2"/}</td>
				<td><div pricefor='surgical_epiphysiodesis_bi'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_polio_AL</td>
				<td>{@input header="Bill.surgical_polio_AL" extra="size=2"/}</td>
				<td><div pricefor='surgical_polio_AL'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_polio_achileus_Achileus_lenthening_bi</td>
				<td>{@input header="Bill.surgical_polio_achileus_Achileus_lenthening_bi" extra="size=2"/}</td>
				<td><div pricefor='surgical_polio_achileus_Achileus_lenthening_bi'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_percutaneous_AL_club_foot</td>
				<td>{@input header="Bill.surgical_percutaneous_AL_club_foot" extra="size=2"/}</td>
				<td><div pricefor='surgical_percutaneous_AL_club_foot'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_percutaneous_achil_tenotomy_bi_cmosh</td>
				<td>{@input header="Bill.surgical_percutaneous_achil_tenotomy_bi_cmosh" extra="size=2"/}</td>
				<td><div pricefor='surgical_percutaneous_achil_tenotomy_bi_cmosh'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_percutaneous_achil_tenotomy_uni_cdc</td>
				<td>{@input header="Bill.surgical_percutaneous_achil_tenotomy_uni_cdc" extra="size=2"/}</td>
				<td><div pricefor='surgical_percutaneous_achil_tenotomy_uni_cdc'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_percutaneous_achil_tenotomy_bi_cdc</td>
				<td>{@input header="Bill.surgical_percutaneous_achil_tenotomy_bi_cdc" extra="size=2"/}</td>
				<td><div pricefor='surgical_percutaneous_achil_tenotomy_bi_cdc'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_PMR_club_foot</td>
				<td>{@input header="Bill.surgical_PMR_club_foot" extra="size=2"/}</td>
				<td><div pricefor='surgical_PMR_club_foot'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_PMR_club_club_foot_bi</td>
				<td>{@input header="Bill.surgical_PMR_club_club_foot_bi" extra="size=2"/}</td>
				<td><div pricefor='surgical_PMR_club_club_foot_bi'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_Burn_release</td>
				<td>{@input header="Bill.surgical_Burn_release" extra="size=2"/}</td>
				<td><div pricefor='surgical_Burn_release'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_burn_little_release</td>
				<td>{@input header="Bill.surgical_burn_little_release" extra="size=2"/}</td>
				<td><div pricefor='surgical_burn_little_release'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_Pin_removal</td>
				<td>{@input header="Bill.surgical_Pin_removal" extra="size=2"/}</td>
				<td><div pricefor='surgical_Pin_removal'>...</div></td>
			</tr><tr>
				<td>Bill.surgical_other_operation</td>
				<td>{@input header="Bill.surgical_other_operation" extra="%20size%3D6"/}</td>
				<td><div pricefor='surgical_other_operation'>...</div></td>
			</tr>
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