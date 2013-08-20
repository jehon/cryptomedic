<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('Bill.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('Bill.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="Bill" />
	<?php 
	require_once("amd_prices.php");
	global $amd_prices;
	?>
	<Table width='100%'>
		<col width='50%'>
		<col width='50%'>
		<tr>
			<td>
				<FieldSet>
					<legend><label for="Bill-GeneralData" name="Bill-GeneralData">General Data</label></legend>
					<table  class='colorize'>
						<tr>
							<td><label for="BillDate" name="Bill.Date">Bill.Date</label></td>
							<td><? echo $kdm->makeInput('Bill.Date'); ?></td>
						</tr><tr>
							<td><label for="BillExaminerName" name="Bill.ExaminerName">Examiner Name</label></td>
							<td><? echo $kdm->makeInput('Bill.ExaminerName'); ?></td>
						</tr><tr>
							<td><label for="BillCenter" name="Bill.Center">NonricketConsult.Center</label></td>
							<td><? echo $kdm->makeInput('Bill.Center'); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<legend><label for="Bill-Consults" name="Bill-Consults">Consultations</label></legend>
					<table  class='colorize'>
						<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
						<tr>
							<td></td>
							<td><label for="Quantity" name="Quantity">Quantity</label></td>
							<td><label for="Price" name="Price">Price</label></td>
						</tr><tr>
							<td>Bill.consult_CDC_consultation_physio</td>
							<td><? echo $kdm->makeInput('Bill.consult_CDC_consultation_physio', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_CDC_consultation_physio'><? echo $amd_prices['Bill.consult_CDC_consultation_physio']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_CDC_consultation_Bengali_Doctor</td>
							<td><? echo $kdm->makeInput('Bill.consult_CDC_consultation_Bengali_Doctor', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_CDC_consultation_Bengali_Doctor'><? echo $amd_prices['Bill.consult_CDC_consultation_Bengali_Doctor']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_field_visit</td>
							<td><? echo $kdm->makeInput('Bill.consult_field_visit', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_field_visit'><? echo $amd_prices['Bill.consult_field_visit']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_home_visit</td>
							<td><? echo $kdm->makeInput('Bill.consult_home_visit', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_home_visit'><? echo $amd_prices['Bill.consult_home_visit']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_medecine</td>
							<td><? echo $kdm->makeInput('Bill.consult_medecine', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_medecine'><? echo $amd_prices['Bill.consult_medecine']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_making_plaster</td>
							<td><? echo $kdm->makeInput('Bill.consult_making_plaster', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_making_plaster'><? echo $amd_prices['Bill.consult_making_plaster']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_making_dressing</td>
							<td><? echo $kdm->makeInput('Bill.consult_making_dressing', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_making_dressing'><? echo $amd_prices['Bill.consult_making_dressing']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_X_Ray</td>
							<td><? echo $kdm->makeInput('Bill.consult_X_Ray', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_X_Ray'><? echo $amd_prices['Bill.consult_X_Ray']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_physiotherapy</td>
							<td><? echo $kdm->makeInput('Bill.consult_physiotherapy', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.consult_physiotherapy'><? echo $amd_prices['Bill.consult_physiotherapy']; ?></div></td>
						</tr><tr>
							<td>Bill.consult_Other_consultation_care</td>
							<td></td>
							<td><? echo $kdm->makeInput('Bill.consult_Other_consultation_care', array (  'size' => 6,)); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<legend><label for="Bill-Workshop" name="Bill-Workshop">Workshop</label></legend>
					<table  class='colorize'>
						<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
						<tr>
							<td></td>
							<td><label for="Quantity" name="Quantity">Quantity</label></td>
							<td><label for="Price" name="Price">Price</label></td>
						</tr><tr>
							<td>Bill.workshop_BHKAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BHKAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BHKAFO_night'><? echo $amd_prices['Bill.workshop_BHKAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_BHKAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BHKAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BHKAFO_walking'><? echo $amd_prices['Bill.workshop_BHKAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UHKAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UHKAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UHKAFO_night'><? echo $amd_prices['Bill.workshop_UHKAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UHKAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UHKAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UHKAFO_walking'><? echo $amd_prices['Bill.workshop_UHKAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_BKAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BKAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BKAFO_night'><? echo $amd_prices['Bill.workshop_BKAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_BKAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BKAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BKAFO_walking'><? echo $amd_prices['Bill.workshop_BKAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UKAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UKAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UKAFO_night'><? echo $amd_prices['Bill.workshop_UKAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UKAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UKAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UKAFO_walking'><? echo $amd_prices['Bill.workshop_UKAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Knee_brace</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Knee_brace', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Knee_brace'><? echo $amd_prices['Bill.workshop_Knee_brace']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_BAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BAFO_night'><? echo $amd_prices['Bill.workshop_BAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_BAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_BAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_BAFO_walking'><? echo $amd_prices['Bill.workshop_BAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UAFO_night</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UAFO_night', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UAFO_night'><? echo $amd_prices['Bill.workshop_UAFO_night']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_UAFO_walking</td>
							<td><? echo $kdm->makeInput('Bill.workshop_UAFO_walking', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_UAFO_walking'><? echo $amd_prices['Bill.workshop_UAFO_walking']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Orthoshoes_with_bar</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Orthoshoes_with_bar', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Orthoshoes_with_bar'><? echo $amd_prices['Bill.workshop_Orthoshoes_with_bar']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Orthoshoes_without_bar</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Orthoshoes_without_bar', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Orthoshoes_without_bar'><? echo $amd_prices['Bill.workshop_Orthoshoes_without_bar']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_DDB_splint</td>
							<td><? echo $kdm->makeInput('Bill.workshop_DDB_splint', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_DDB_splint'><? echo $amd_prices['Bill.workshop_DDB_splint']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Compensation_sole</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Compensation_sole', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Compensation_sole'><? echo $amd_prices['Bill.workshop_Compensation_sole']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Arch_support</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Arch_support', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Arch_support'><? echo $amd_prices['Bill.workshop_Arch_support']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Matetarsal_pade</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Matetarsal_pade', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Matetarsal_pade'><? echo $amd_prices['Bill.workshop_Matetarsal_pade']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Supinator_corner</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Supinator_corner', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Supinator_corner'><? echo $amd_prices['Bill.workshop_Supinator_corner']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Wirst_splint</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Wirst_splint', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Wirst_splint'><? echo $amd_prices['Bill.workshop_Wirst_splint']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Hand_splint</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Hand_splint', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Hand_splint'><? echo $amd_prices['Bill.workshop_Hand_splint']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Finger_splint</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Finger_splint', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Finger_splint'><? echo $amd_prices['Bill.workshop_Finger_splint']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Walker_with_wheel</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Walker_with_wheel', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Walker_with_wheel'><? echo $amd_prices['Bill.workshop_Walker_with_wheel']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Walker_without_wheel</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Walker_without_wheel', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Walker_without_wheel'><? echo $amd_prices['Bill.workshop_Walker_without_wheel']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Crutch_a_pair</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Crutch_a_pair', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Crutch_a_pair'><? echo $amd_prices['Bill.workshop_Crutch_a_pair']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Crutch_a_piece</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Crutch_a_piece', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Crutch_a_piece'><? echo $amd_prices['Bill.workshop_Crutch_a_piece']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Wheel_chair</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Wheel_chair', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Wheel_chair'><? echo $amd_prices['Bill.workshop_Wheel_chair']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_CP_chair</td>
							<td><? echo $kdm->makeInput('Bill.workshop_CP_chair', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_CP_chair'><? echo $amd_prices['Bill.workshop_CP_chair']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_CP_standing_table</td>
							<td><? echo $kdm->makeInput('Bill.workshop_CP_standing_table', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_CP_standing_table'><? echo $amd_prices['Bill.workshop_CP_standing_table']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Cervical_Collar</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Cervical_Collar', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Cervical_Collar'><? echo $amd_prices['Bill.workshop_Cervical_Collar']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Abdominal_corset_belt</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Abdominal_corset_belt', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Abdominal_corset_belt'><? echo $amd_prices['Bill.workshop_Abdominal_corset_belt']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Reparing</td>
							<td><? echo $kdm->makeInput('Bill.workshop_Reparing', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.workshop_Reparing'><? echo $amd_prices['Bill.workshop_Reparing']; ?></div></td>
						</tr><tr>
							<td>Bill.workshop_Other_orthodevice</td>
							<td></td>
							<td><? echo $kdm->makeInput('Bill.workshop_Other_orthodevice', array (  'size' => 6,)); ?></td>
						</tr>
					</table>
				</FieldSet>
				<FieldSet>
					<legend><label for="Bill-Surgery" name="Bill-Surgery">Surgery</label></legend>
					<table  class='colorize'>
						<col width='60%' /><col width='15%' /><col width='15%' /><col width='10%' /> 
						<tr>
							<td></td>
							<td><label for="Quantity" name="Quantity">Quantity</label></td>
							<td><label for="Price" name="Price">Price</label></td>
						</tr><tr>
							<td>Bill.surgical_osteotomy</td>
							<td><? echo $kdm->makeInput('Bill.surgical_osteotomy', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_osteotomy'><? echo $amd_prices['Bill.surgical_osteotomy']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_epiphysiodesis</td>
							<td><? echo $kdm->makeInput('Bill.surgical_epiphysiodesis', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_epiphysiodesis'><? echo $amd_prices['Bill.surgical_epiphysiodesis']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_polio_AL</td>
							<td><? echo $kdm->makeInput('Bill.surgical_polio_AL', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_polio_AL'><? echo $amd_prices['Bill.surgical_polio_AL']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_percutaneous_AL_club_foot</td>
							<td><? echo $kdm->makeInput('Bill.surgical_percutaneous_AL_club_foot', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_percutaneous_AL_club_foot'><? echo $amd_prices['Bill.surgical_percutaneous_AL_club_foot']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_PMR_club_foot</td>
							<td><? echo $kdm->makeInput('Bill.surgical_PMR_club_foot', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_PMR_club_foot'><? echo $amd_prices['Bill.surgical_PMR_club_foot']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_Burn_release</td>
							<td><? echo $kdm->makeInput('Bill.surgical_Burn_release', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_Burn_release'><? echo $amd_prices['Bill.surgical_Burn_release']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_Pin_removal</td>
							<td><? echo $kdm->makeInput('Bill.surgical_Pin_removal', array (  'size' => 2,)); ?></td>
							<td><div pricefor='Bill.surgical_Pin_removal'><? echo $amd_prices['Bill.surgical_Pin_removal']; ?></div></td>
						</tr><tr>
							<td>Bill.surgical_other_operation</td>
							<td></td>
							<td><? echo $kdm->makeInput('Bill.surgical_other_operation', array (  'size' => 6,)); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element('belongsTo'); ?></span>
				<br>
				<FieldSet>
					<legend><label for="Bill-Total" name="Bill-Total">Total</label></legend>
					<table  class='colorize'>
						<col width='70%' /><col width='*' /> 
						<tr>
							<td><label for="BillTotalReal" name="Bill.total_real">Total real</label></td>
							<td><?php echo $kdm->makeView("Bill.total_real"); ?></td>
	                        <input type="hidden" name="data[total_real]" value="<? echo $kdm->getValue("Bill.total_real"); ?>" id="BillTotalReal" />
						</tr><tr>
							<td><label for="BillSocialLevel" name="Bill.socialLevel">Bill.socialLevel</label></td>
							<td><? echo $kdm->makeInput('Bill.socialLevel'); ?></td>
						</tr>
	                    <!-- <tr modes='edit add' style="height: 60px; vertical-align: middle; text-align: right">
	                        <td></td>
	                        <td><a modes='edit' class='textbutton' href="javascript: amd.businessrules.billscalculate();"><img src="/cryptomedic/img/calculate.gif"> calculate</a></td>
	                    </tr> -->
	                 	<tr>
							<td><label for="BillTotalAsked" name="Bill.total_asked">Total asked</label></td>
							<td><?php echo $kdm->makeView("Bill.total_asked"); ?></td>
							<input type="hidden" name="data[total_asked]" value="<? echo $kdm->getValue("Bill.total_asked"); ?>" id="BillTotalAsked" />
						</tr><tr>
							<td><label for="BillTotalPaid" name="Bill.total_paid">Bill.total_paid</label></td>
							<td><? echo $kdm->makeInput('Bill.total_paid'); ?></td>
						</tr>
					</table>
				</FieldSet>
			</td>
		</tr>
	</Table>
	<input type='hidden' name='data[dryrun]' id='dryrun' value=0 />
</form>