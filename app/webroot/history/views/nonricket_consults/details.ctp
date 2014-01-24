<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
	<div id='headerContainer' class='headerContainer'></div>
	<input type="hidden" name="_method" value="PUT" />
	<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('NonricketConsult.id'); ?>" />
	<input type="hidden" name="data[patient_id]" value="<? echo $kdm->getValue('NonricketConsult.patient_id'); ?>" />
	<input type="hidden" name="data[type]" value="NonricketConsult" />
	<table width='100%'>
		<col width='50%' /><col width='*' /> 
		<tr>
			<td>
				<fieldset>
					<legend><label for="NonricketConsult-GeneralData" name="NonricketConsult-GeneralData">General Data</label></legend>
					<table  class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="NonricketConsultDate" name="NonricketConsult.Date">Date</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Date'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultExaminerName" name="NonricketConsult.ExaminerName">Examiner Name</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.ExaminerName'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultCenter" name="NonricketConsult.Center">NonricketConsult.Center</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Center'); ?></td>
						</tr><tr modes='read'>
							<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
							<td><span id='stats_base_age'></span></td>
						</tr><tr>
							<td><label for="NonricketConsultSchoolClass" name="NonricketConsult.SchoolClass">School Class</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.SchoolClass'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultPathology" name="NonricketConsult.Pathology">Pathology</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Pathology'); ?></td>
						</tr>
					</table>
				</fieldset>
				<br/>
				<fieldset>
					<legend><label for="NonricketConsult-NutritionalData" name="NonricketConsult-NutritionalData">Nutritional Data</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
						<tr><td/><td/><td>Deviation :</td></tr>					<tr>
							<td><label for="NonricketConsultWeightkg" name="NonricketConsult.Weightkg">Weight (kg)</label></td>
							<td class='tdright'><? echo $kdm->makeInput('NonricketConsult.Weightkg'); ?></td>
							<td class='tdleft'><span id='stats_ds_weight'></span></td>
						</tr><tr>
							<td><label for="NonricketConsultHeightcm" name="NonricketConsult.Heightcm">Height (cm)</label></td>
							<td class='tdright'><? echo $kdm->makeInput('NonricketConsult.Heightcm'); ?></td>
							<td class='tdleft'><div id='stats_ds_height'></div></td>
						</tr><tr>
							<td><label for="NonricketConsultWeightHeightRatio" name="NonricketConsult.Weight_Height_Ratio">NonricketConsult.Weight_Height_Ratio</label></td>
							<td class='tdright'><div id='stats_base_wh'></div></td>
							<td class='tdleft'><div id='stats_ds_wh'></div></td>
						</tr><tr>
							<td><label for="NonricketConsultBmi" name="NonricketConsult.bmi">BMI</label></td>
							<td><div id='stats_base_bmi'></div></td>
							<td><div id='stats_ds_bmi'></div></td>
						</tr><tr>
							<td><label for="NonricketConsultBrachialcircumferencecm" name="NonricketConsult.Brachialcircumferencecm">MUAC - Brachial circumference (cm)</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Brachialcircumferencecm'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultUndernutrited" name="NonricketConsult.Undernutrited">Undernutrited</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Undernutrited'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultWorms" name="NonricketConsult.Worms">Worms</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Worms'); ?></td>
						</tr>
					</table>
				</fieldset>
				<br/>
				<fieldset>
					<legend><label for="NonricketConsult-OrthopedicData" name="NonricketConsult-OrthopedicData">Orthopedic Data</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="NonricketConsultSide" name="NonricketConsult.Side">Side</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Side'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultJointsorbonesaffected" name="NonricketConsult.Jointsorbonesaffected">Joints or bones affected</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Jointsorbonesaffected'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultDeformity" name="NonricketConsult.Deformity">Deformity</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Deformity'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultArticulationmobility" name="NonricketConsult.Articulationmobility">Range of motion</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Articulationmobility'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultMusclestrength" name="NonricketConsult.Musclestrength">Muscle (strength/palsy)</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Musclestrength'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultPain" name="NonricketConsult.Pain">Pain</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Pain'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultWalk" name="NonricketConsult.Walk">Walking difficulties (palisano)</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Walk'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultXRay" name="NonricketConsult.XRay">X-Ray</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.XRay'); ?></td>
						</tr>			
					</table>
				</fieldset>
			</td>
			<td>
				<span id='belongsTo'><? echo $this->element("belongsTo"); ?></span>
				<fieldset>
					<legend><label for="NonricketConsult-Conclusion" name="NonricketConsult-Conclusion">Conclusion</label></legend>
					<table class='colorize'>
						<col width='30%' /><col width='*' /> 
						<tr>
							<td><label for="NonricketConsultPhysiotherapy61" name="NonricketConsult.Physiotherapy61">Physiotherapy</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Physiotherapy61'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultPlaster62" name="NonricketConsult.Plaster62">Plaster</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Plaster62'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultOrthopedicdevice65" name="NonricketConsult.Orthopedicdevice65">Orthopedic device</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Orthopedicdevice65'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultSurgery66" name="NonricketConsult.Surgery66">Surgery</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Surgery66'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultOthertreatment68" name="NonricketConsult.Othertreatment68">Other treatment</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Othertreatment68'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultComment" name="NonricketConsult.Comment">Comment</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Comment'); ?></td>
						</tr><tr>
							<td><label for="NonricketConsultNextappointment" name="NonricketConsult.Nextappointment">Next appointment</label></td>
							<td><? echo $kdm->makeInput('NonricketConsult.Nextappointment'); ?></td>
						</tr>
					</table>
				</fieldset>		
			</td>
		</tr>
	</table>
</form>