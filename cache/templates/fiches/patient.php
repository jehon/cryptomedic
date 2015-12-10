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
					<?php (new t("Patient.Yearofbirth",  [ "min" => 900, "max" => 2100]))->tr("Year of birth")->p(); ?></td>
					<tr class='notModeWrite'>
						<td>Age (today)</td>
						<td><span catch-it ng-model="folder" tryit="currentFile().actualAge()">{{currentFile().actualAge()}} years old</span></td>
					</tr>
					<?php (new t("Patient.District", [ "list" => References::$lists['Districts']]))->tr()->p(); ?>
					<?php (new t("Patient.Upazilla", [ "list" => References::$lists['Upazilla']]))->tr()->p(); ?>
					<?php (new t("Patient.Union_", [ "list" => References::$lists['Unions']]))->tr("Union")->p(); ?>
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
					<?php (new t("Patient.other_comments"))->tr("History of the complaint")->p(); ?>
				</table>
			</fieldset>
	 		<br/>
		</div>
	</div>
</div>
