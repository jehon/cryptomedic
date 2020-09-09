<?php
	t::setDefaultOption("baseExpression", "folder.getPatient().");
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-md-6">
	        <x-group-panel title='General data'>
				<x-fff-field ng-if="patient_id > -1" label='Entry Number'>
					<div><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></div>
				</x-fff-field>
				<x-fff-field ng-if="patient_id == -1" label='Entry Year'>
					<div>
						<x-message level='info'>
							You asked the system to generate a reference for you. This reference will be generated
							when you will save this file. I just need the year to build up the reference.
							<?php (new t("Patient.entryyear", [ "required" => "required" ]))->write()->p(); ?>
						</x-message>
					</div>
				</x-fff-field>
				<?php (new t("Patient.Name"))->tr2("Name")->p(); ?>
				<?php (new t("Patient.Sex"))->tr2()->p(); ?>
				<x-fff-field label='Year of birth'>
					<div>
						{{folder.getPatient().Yearofbirth}}
						<div class='notModeRead'>
							<h5>Calculate year of birth</h5>
							<div><input ng-model='age.years' type='number' min='0' max='100'> years</div>
							<div><input ng-model='age.months' type='number' min='-1' max='12'> months</div>
						</div>
					</div>
				</x-fff-field>
				<div class='notModeRead'>Calculate year of birth</div>
				<x-fff-field class='notModeWrite' label='Age (today)'>
					<div id='#ageToday'><x-fff-age></x-fff-age> old</div>
				</x-fff-field>
				<x-fff-field field='District'>
					<div>
						<span class='notModeRead'>
							<x-write-list value='{{folder.getPatient().District}}' name='District' list-name='Districts' nullable></x-write-list>
						</span>
						<span class='notModeWrite'>
							<?php (new t("Patient.District"))->read()->p(); ?>
						</span>
					</div>
				</x-fff-field>
				<x-fff-field field='Upazilla'>
					<div>
						<span class='notModeRead'>
							<x-write-list value='{{folder.getPatient().Upazilla}}' name='Upazilla' nullable></x-write-list>
						</span>
						<span class='notModeWrite'>
							<?php (new t("Patient.Upazilla"))->read()->p(); ?>
						</span>
					</div>
				</x-fff-field>
				<x-fff-field field='Union'>
					<div>
						<span class='notModeRead'>
							<x-write-list value='{{folder.getPatient().Union_}}' name='Union_' nullable></x-write-list>
						</span>
						<span class='notModeWrite'>
							<?php (new t("Patient.Union_"))->read()->p(); ?>
						</span>
					</div>
				</x-fff-field>
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
