<?php
	t::setDefaultOption("baseExpression", "folder.getPatient().");
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-md-6">
	        <x-group-panel title='General data'>
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
				</table>
				<?php (new t("Patient.Name"))->tr2("Name")->p(); ?>
				<?php (new t("Patient.Sex"))->tr2()->p(); ?>
				<table>
					<tr>
						<td>Year of birth</td>
						<td>
							{{folder.getPatient().Yearofbirth}}
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
                        <td id='#ageToday'><x-fff-age></x-fff-age> old</td>
					</tr>
					<tr ng-class='{ emptyValue: !folder.getPatient().District}'>
						<td>District</td>
						<td>
							<span class='notModeRead'>
								<x-write-list value='{{folder.getPatient().District}}' name='District' list-name='Districts' nullable></x-write-list>
							</span>
							<span class='notModeWrite'>
								<?php (new t("Patient.District"))->read()->p(); ?>
							</span>
						</td>
					</tr>
					<tr>
						<td>Upazilla</td>
						<td>
							<span class='notModeRead'>
								<x-write-list value='{{folder.getPatient().Upazilla}}' name='Upazilla' nullable></x-write-list>
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
								<x-write-list value='{{folder.getPatient().Union_}}' name='Union_' nullable></x-write-list>
							</span>
							<span class='notModeWrite'>
								<?php (new t("Patient.Union_"))->read()->p(); ?>
							</span>
						</td>
					</tr>
				</table>
				<?php (new t("Patient.Telephone"))->tr2()->p(); ?>
				<?php (new t("Patient.AddressNotes"))->tr2("Adress Notes")->p(); ?>
			</x-group-panel>
	 	</div>
		<div class="col-md-6">
			<x-group-panel id='PatientPathology' ng-class='{ jserror: errors.noPathology }' title='Pathology'>
				<?php (new t("Patient.Pathology"))->tr2("Main pathology")->p(); ?>
				<?php (new t("Patient.other_comments"))->tr2("Other comments")->p(); ?>
			</x-group-panel>
	 		<br/>
		</div>
	</div>
	<jh-script>
		document.querySelector("x-write-list[name=Upazilla]")
			.follow(document.querySelector("x-write-list[name=District]"), "district");

		document.querySelector("x-write-list[name=Union_]")
			.follow(document.querySelector("x-write-list[name=Upazilla]"), "upazilla");
  	</jh-script>
</div>
