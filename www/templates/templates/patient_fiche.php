<?php
t::setDefaultOption("baseExpression", "folder.getPatient()."); ?>
<x-two-columns>
	<div>
		<x-group-panel title='General data'>
			<x-fff-field ng-if="patient_id > -1" label='Entry Number'>
				<div><?php (new t("Patient.entry_year"))->read()->p(); ?>-<?php (new t(
    "Patient.entry_order"
))
    ->read()
    ->p(); ?></div>
			</x-fff-field>
			<x-fff-field ng-if="patient_id == -1" label='Entry Year'>
				<div>
					<x-message level='info'>
						You asked the system to generate a reference for you. This reference will be generated
						when you will save this file. I just need the year to build up the reference.
						<?php (new t("Patient.entry_year", ["required" => "required"]))
          ->write()
          ->p(); ?>
					</x-message>
				</div>
			</x-fff-field>
			<?php (new t("Patient.name"))->tr2("Name")->p(); ?>
			<?php (new t("Patient.sex"))->tr2()->p(); ?>
			<x-fff-field label='Year of birth'>
				<div>
					{{folder.getPatient().year_of_birth}}
					<div class='not-mode-read'>
						<h5>Calculate year of birth</h5>
						<div><input ng-model='age.years' type='number' min='0' max='100'> years</div>
						<div><input ng-model='age.months' type='number' min='-1' max='12'> months</div>
					</div>
				</div>
			</x-fff-field>
			<div class='not-mode-read'>Calculate year of birth</div>
			<x-fff-field class='not-mode-write' label='Age (today)' variable>
				<div id='#ageToday' variable>
					<x-fff-age></x-fff-age> old
				</div>
			</x-fff-field>
			<x-fff-field field='address_district' label='District'>
				<div>
					<span class='not-mode-read'>
						<x-write-list value='{{folder.getPatient().address_district}}' name='address_district' list-name='Districts' nullable></x-write-list>
					</span>
					<span class='not-mode-write'>
						<?php (new t("Patient.address_district"))->read()->p(); ?>
					</span>
				</div>
			</x-fff-field>
			<x-fff-field field='address_upazilla' label='Upazilla'>
				<div>
					<span class='not-mode-read'>
						<x-write-list value='{{folder.getPatient().address_upazilla}}' name='address_upazilla' nullable></x-write-list>
					</span>
					<span class='not-mode-write'>
						<?php (new t("Patient.address_upazilla"))->read()->p(); ?>
					</span>
				</div>
			</x-fff-field>
			<x-fff-field field='address_union' label='Union'>
				<div>
					<span class='not-mode-read'>
						<x-write-list value='{{folder.getPatient().address_union}}' name='address_union' nullable></x-write-list>
					</span>
					<span class='not-mode-write'>
						<?php (new t("Patient.address_union"))->read()->p(); ?>
					</span>
				</div>
			</x-fff-field>
			<?php (new t("Patient.phone"))->tr2()->p(); ?>
			<?php (new t("Patient.address_comments"))->tr2("Adress Notes")->p(); ?>
		</x-group-panel>
	</div>
	<div>
		<x-group-panel id='PatientPathology' ng-class='{ jserror: errors.noPathology }' title='Pathology'>
			<?php (new t("Patient.pathology"))->tr2("Main Pathology")->p(); ?>
			<?php (new t("Patient.comments"))->tr2("Comments")->p(); ?>
		</x-group-panel>
		<br />
	</div>
</x-two-columns>
<jh-script>
	document.querySelector("x-write-list[name=address_upazilla]")
	.follow(document.querySelector("x-write-list[name=address_district]"), "district");

	document.querySelector("x-write-list[name=address_union]")
	.follow(document.querySelector("x-write-list[name=address_upazilla]"), "upazilla");
</jh-script>