<?php
	use App\Model\References;

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
					<tr>
						<td>Year of birth</td>
						<td>
							{{folder.getMainFile().Yearofbirth}}
							<div class='notModeRead'>
								<h5>Calculate year of birth</h5>
								<input ng-model='age.years' type='number' min='0' max='100'> years<br>
								<input ng-model='age.months' type='number' min='-1' max='12'> months
							</div>
						</td>
					</tr>
					<tr class='notModeRead'>
						<td>Calculate year of birth</td>
						<td>
						</td>
					</tr>
					<tr class='notModeWrite'>
						<td>Age (today)</td>
						<td>{{calculations.age.fromBirthDate(currentFile().Yearofbirth)}} old</td>
					</tr>
					<?php (new t("Patient.District"))->tr()->p(); ?>
					<tr>
						<td>Upazilla</td>
						<td>
							<span class='notModeRead'>
								<select ng-model='folder.getMainFile().Upazilla' null-to-interrogation ng-options='option for option in listUpazillas(folder.getMainFile().District, folder.getMainFile().Upazilla)'></select>
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
								<select ng-model='folder.getMainFile().Union_' null-to-interrogation ng-options='option for option in listUnions(folder.getMainFile().Upazilla, folder.getMainFile().Union_)'></select>
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
			<fieldset id='PatientPathology' ng-class='{ jserror: errors.noPathology }'>
			<legend>Pathology</legend>
				<table>
					<?php (new t("Patient.Pathology"))->tr("Main pathology")->p(); ?>
					<?php (new t("Patient.other_comments"))->tr("Other comments")->p(); ?>
				</table>
			</fieldset>
	 		<br/>
		</div>
	</div>
</div>
