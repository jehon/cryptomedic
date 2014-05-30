<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div class="col-sm-6">
	<fieldset>
		<legend><label for="NonricketConsult-GeneralData" name="NonricketConsult-GeneralData">General Data</label></legend>
		<table  class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("NonricketConsult.Date");?></td>
				<td><?php value("NonricketConsult.Date"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.ExaminerName");?></td>
				<td><?php value("NonricketConsult.ExaminerName"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Center");?></td>
				<td><?php value("NonricketConsult.Center"); ?></td>
			</tr><tr modes='read'>
				<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
				<td>{stats_base_age}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.SchoolClass");?></td>
				<td><?php value("NonricketConsult.SchoolClass"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Pathology");?></td>
				<td><?php value("NonricketConsult.Pathology"); ?></td>
			</tr>
		</table>
	</fieldset>
	<br/>
	<fieldset>
		<legend><label for="NonricketConsult-NutritionalData" name="NonricketConsult-NutritionalData">Nutritional Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' style='text-align: right' /><col width='20%' /> 
			<tr><td/><td/><td>Deviation :</td></tr>					<tr>
				<td><?php label("NonricketConsult.Weightkg");?></td>
				<td class='tdright'><?php value("NonricketConsult.Weightkg"); ?></td>
				<td>{stats_ds_weight}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.Heightcm");?></td>
				<td class='tdright'><?php value("NonricketConsult.Heightcm"); ?></td>
				<td>{stats_ds_height}</div></td>
			</tr><tr>
				<td><label for="NonricketConsultWeightHeightRatio" name="NonricketConsult.Weight_Height_Ratio">Weight/Height Ratio</label></td>
				<td class='tdright'>{stats_base_wh}</td>
				<td>{stats_ds_wh}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.bmi");?></td>
				<td>{stats_base_bmi}</td>
				<td>{stats_ds_bmi}</td>
			</tr><tr>
				<td><?php label("NonricketConsult.Brachialcircumferencecm");?></td>
				<td><?php value("NonricketConsult.Brachialcircumferencecm"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Undernutrited");?></td>
				<td><?php value("NonricketConsult.Undernutrited"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Worms");?></td>
				<td><?php value("NonricketConsult.Worms"); ?></td>
			</tr>
		</table>
	</fieldset>
	<br/>
	<fieldset>
		<legend><label for="NonricketConsult-OrthopedicData" name="NonricketConsult-OrthopedicData">Orthopedic Data</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><?php label("NonricketConsult.Side");?></td>
				<td><?php value("NonricketConsult.Side"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Jointsorbonesaffected");?></td>
				<td><?php value("NonricketConsult.Jointsorbonesaffected"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Deformity");?></td>
				<td><?php value("NonricketConsult.Deformity"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Articulationmobility");?></td>
				<td><?php value("NonricketConsult.Articulationmobility"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Musclestrength");?></td>
				<td><?php value("NonricketConsult.Musclestrength"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Pain");?></td>
				<td><?php value("NonricketConsult.Pain"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Walk");?></td>
				<td><?php value("NonricketConsult.Walk"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.XRay");?></td>
				<td><?php value("NonricketConsult.XRay"); ?></td>
			</tr>			
		</table>
	</fieldset>
</div>
<div class="col-sm-6">
	<div ng-include="'partials/patient_summary.php'"></div>
	<fieldset>
		<legend><label for="NonricketConsult-Conclusion" name="NonricketConsult-Conclusion">Conclusion</label></legend>
		<table class='colorize'>
			<col width='30%' /><col width='*' /> 
			<tr>
				<td><label for="NonricketConsultPhysiotherapy61" name="NonricketConsult.Physiotherapy61">Physiotherapy</label></td>
				<td><?php value("NonricketConsult.Physiotherapy61"); ?></td>
			</tr><tr>
				<td><label for="NonricketConsultPlaster62" name="NonricketConsult.Plaster62">Plaster</label></td>
				<td><?php value("NonricketConsult.Plaster62"); ?></td>
			</tr><tr>
				<td><label for="NonricketConsultOrthopedicdevice65" name="NonricketConsult.Orthopedicdevice65">Orthopedic device</label></td>
				<td><?php value("NonricketConsult.Orthopedicdevice65"); ?></td>
			</tr><tr>
				<td><label for="NonricketConsultSurgery66" name="NonricketConsult.Surgery66">Surgery</label></td>
				<td><?php value("NonricketConsult.Surgery66"); ?></td>
			</tr><tr>
				<td><label for="NonricketConsultOthertreatment68" name="NonricketConsult.Othertreatment68">Other treatment</label></td>
				<td><?php value("NonricketConsult.Othertreatment68"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Comment");?></td>
				<td><?php value("NonricketConsult.Comment"); ?></td>
			</tr><tr>
				<td><?php label("NonricketConsult.Nextappointment");?></td>
				<td><?php value("NonricketConsult.Nextappointment"); ?></td>
			</tr>
		</table>
	</fieldset>		
</div>