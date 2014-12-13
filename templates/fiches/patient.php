<?php 
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
?>
<div class='container-fluid' ng-controller="ctrl_patient">
	<div class='row'>
		<div class="col-lg-6">
	        <fieldset>
				<legend>General data</legend>
				<table>
					<tr>
						<td>Entry Number</td>
						<td><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></td>
					</tr>
					<?php (new t("Patient.Firstname"))->tr("First Name")->p(); ?>
					<?php (new t("Patient.Lastname"))->tr("Last Name")->p(); ?>
					<?php (new t("Patient.Sex"))->tr()->p(); ?>
					<?php (new t("Patient.Yearofbirth",  [ "min" => 900, "max" => 2100]))->tr("Year of birth")->p(); ?></td>
					<tr class='notModeWrite'>
						<td>Age (today)</td>
						<td><span catch-it ng-model="folder" tryit="currentFile().actualAge()">{{result}} years old</span></td>
					</tr>
					<?php (new t("Patient.District"))->tr()->p(); ?>
					<?php (new t("Patient.Upazilla"))->tr()->p(); ?>
					<?php (new t("Patient.Union_"))->tr("Union")->p(); ?>
					<?php (new t("Patient.Telephone"))->tr()->p(); ?>
					<?php (new t("Patient.AddressNotes"))->tr("Adress Notes")->p(); ?>
				</table>
			</fieldset>
	 	</div>
		<div class="col-lg-6">
			<fieldset id='PatientPathology' ng-class='{ errors.noPathology: jserror }'>
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
					<?php (new t("Patient.historyofcomplaint"))->tr("History of the complaint")->p(); ?>
				</table>
			</fieldset>
	 		<br/>
 			<fieldset>
				<legend>Social Data</legend>
				<table>
					<?php (new t("Patient.Familysalaryinamonth"))->tr("Family Salary in a Month")->p(); ?>
					<?php (new t("Patient.Numberofhouseholdmembers"))->tr("Number of Houslehold Members")->p(); ?>
					<tr>
						<td>Salary ratio</td>
						<td><span catch-it ng-model="folder" tryit="currentFile().ratioSalary()">{{ result | number:0 }}</span></td>
					</tr>
	 				<tr>
						<td><hr/></td><td><hr/></td>
					</tr><tr>
						<td>Calculated Social Level</td>
						<td><span catch-it ng-model="folder" tryit="currentFile().calculateSocialLevel()">
							level {{ result | number:0 }}
							</span></td>
					</tr>
					<?php (new t("Patient.Sociallevel"))->tr("Entered Social Level")->p(); ?>
				</table>
			</fieldset>
		</div>
	</div>
</div>
