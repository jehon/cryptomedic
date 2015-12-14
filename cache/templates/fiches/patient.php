<?php
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-md-6">
	        <fieldset>
				<legend>General data</legend>
				<table>
					<tr ng-if="patient_id > -1">
						<td>Entry Number</td>
						<td><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></td>
					</tr>
					<tr ng-if="patient_id == -1">
						<td>Entry Year</td>
						<td>
							<div class='alert alert-info'>
								You asked the system to generate a reference for you. This reference will be generated
								when you will save this file. I just need the year to build up the reference.
								<?php (new t("Patient.entryyear", [ "required" => "required" ]))->write()->p(); ?>
							</div>
						</td>
					</tr>

					<?php (new t("Patient.Name"))->tr("Name")->p(); ?>
					<?php (new t("Patient.Sex"))->tr()->p(); ?>
					<?php (new t("Patient.Yearofbirth",  [ "min" => 1900, "max" => 2100]))->tr("Year of birth")->p(); ?></td>
					<tr class='notModeRead'>
						<td>Calculate year of birth</td>
						<td>
							<input ng-model='age.years' type='number' min='0' max='100'> years<br>
							<input ng-model='age.months' type='number' min='-1' max='12'> months
						</td>
					</tr>
					<tr class='notModeWrite'>
						<td>Age (today)</td>
						<td><span catch-it ng-model="folder" tryit="cryptomedic.age(currentFile().Yearofbirth)">{{cryptomedic.age(currentFile().Yearofbirth)}} years old</span></td>
					</tr>
					<?php (new t("Patient.District", [ "list" => References::$lists['Districts']]))->tr()->p(); ?>
					<tr>
						<td>Upazilla</td>
						<td>
							<span class='notModeRead'>
								<select ng-model='folder.getMainFile().Upazilla' ng-options='option for option in listUpazillas(folder.getMainFile().District)'></select>
							</span>
							<span class='notModeWrite'>
								<?php (new t("Patient.Upazilla"))->read()->p(); ?>
							</span>
						</td>
					</tr>
					<tr>
						<td>Union</td>
						<td>
							<span class='notModeRead'>
								<select ng-model='folder.getMainFile().Union_' ng-options='option for option in listUnions(folder.getMainFile().Upazilla)'></select>
							</span>
							<span class='notModeWrite'>
								<?php (new t("Patient.Union_"))->read()->p(); ?>
							</span>
						</td>
					</tr>
					<?php (new t("Patient.Telephone"))->tr()->p(); ?>
					<?php (new t("Patient.AddressNotes"))->tr("Adress Notes")->p(); ?>
				</table>
			</fieldset>
	 	</div>
		<div class="col-md-6">
<!-- 			<fieldset id='PatientPathology' ng-class='{ errors.noPathology: jserror }'> -->
			<fieldset id='PatientPathology' ng-class='{ jserror: errors.noPathology }'>
			<legend>Pathology</legend>
				<table>
					<tr>
						<td></td>
						<td ng-if="errors.noPathology" class='jserror'>
							Please select at least one pathology
						</td>
					</tr>
					<?php (new t("Patient.pathology_Ricket"))->tr("Ricket (R)")->p(); ?>
					<?php (new t("Patient.pathology_Clubfoot"))->tr("Club foot (CF)")->p(); ?>
					<?php (new t("Patient.pathology_Polio"))->tr("Polio (P)")->p(); ?>
					<?php (new t("Patient.pathology_Burn"))->tr("Burn (B)")->p(); ?>
					<?php (new t("Patient.pathology_CP"))->tr("CP")->p(); ?>
					<?php (new t("Patient.pathology_Congenital"))->tr("Congenital (C)")->p(); ?>
					<?php (new t("Patient.pathology_Adult"))->tr("Patient is adult (A)")->p(); ?>
					<?php (new t("Patient.pathology_other"))->tr("Other (Oth)")->p(); ?>
					<?php (new t("Patient.other_comments"))->tr("Other comments")->p(); ?>
				</table>
			</fieldset>
	 		<br/>
		</div>
	</div>
</div>
