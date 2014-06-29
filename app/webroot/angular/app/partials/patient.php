<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
?>
<span ng-controller="ctrl_patient">
	<div class="col-sm-6">
        <fieldset>
			<legend><?php label("Patient-GeneralData"); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td><?php label("Patient.entrynumber"); ?></td>
					<td><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></td>
				</tr>
				<?php (new t("Patient.Firstname"))->tr()->p(); ?>
				<?php (new t("Patient.Lastname"))->tr()->p(); ?>
				<?php (new t("Patient.Sex"))->tr()->p(); ?>
				<?php (new t("Patient.Yearofbirth",  [ "min" => 900, "max" => 2100]))->tr()->p(); ?></td>
				<tr class='notModeWrite'>
					<td><?php label("Patient-Age"); ?></td>
					<td><span catch-it ng-model="folder" tryit="currentFile().actualAge()">{{result}} years old</span></td>
				</tr>
				<?php (new t("Patient.Fathersname"))->tr()->p(); ?>
				<?php (new t("Patient.District"))->tr()->p(); ?>
				<?php (new t("Patient.Upazilla"))->tr()->p(); ?>
				<?php (new t("Patient.Union_"))->tr()->p(); ?>
				<?php (new t("Patient.Telephone"))->tr()->p(); ?>
				<?php (new t("Patient.AddressNotes"))->tr()->p(); ?>
			</table>
		</fieldset>
		<br/>
		<fieldset id='PatientPathology'>
			<legend><?php label("Patient-Pathology"); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td></td>
					<td id='PatientPathologyError' style='display: none' class='jserror'>
					<?php label("Patient-Nopathology"); ?>
				</td>
				</tr>
				<?php (new t("Patient.pathology_Ricket"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Clubfoot"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Polio"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Burn"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_CP"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Congenital"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_Adult"))->tr()->p(); ?>
				<?php (new t("Patient.pathology_other"))->tr()->p(); ?>
				<?php (new t("Patient.historyofcomplaint"))->tr()->p(); ?>
			</table>
		</fieldset>
		<fieldset>
			<legend><?php label("Patient.Notesforthepatient"); ?></legend>
			<?php (new t("Patient.Notesforthepatient"))->value()->p(); ?>					
		</fieldset>
	</div>
	<div class="col-sm-6">
		<fieldset>
			<legend><?php label("Patient-ChildrenData"); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<?php (new t("Patient.Rowofthechildreninthefamily"))->tr()->p(); ?>
				<?php (new t("Patient.Ageofweaningmonth"))->tr()->p(); ?>
				<?php (new t("Patient.Ageofdiversificationofthefoodmonth"))->tr()->p(); ?>
				<?php (new t("Patient.disease_diarrhoea"))->tr()->p(); ?>
				<?php (new t("Patient.disease_respiratory_infection"))->tr()->p(); ?>
				<?php (new t("Patient.disease_malaria"))->tr()->p(); ?>
				<?php (new t("Patient.disease_typhoid"))->tr()->p(); ?>
			</table>
		</fieldset>
		<br/>
		<fieldset>
			<legend><?php label("Patient-FamilyData"); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<?php (new t("Patient.Religion"))->tr()->p(); ?>
				<?php (new t("Patient.Consanguineousfamily"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofpregnacy"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofbrothersandsisters"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofbrothersandsistersaffectedbyrickets"))->tr()->p(); ?>
			</table>
		</fieldset>
		<br/>
		<fieldset>
			<legend><?php label("Patient-SocialData"); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<?php (new t("Patient.Familysalaryinamonth"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofhouseholdmembers"))->tr()->p(); ?>
				<tr>
					<td><?php label("Patient-Ratio"); ?></td>
					<td><span catch-it ng-model="folder" tryit="currentFile().ratioSalary()">{{ result | number:0 }}</span></td>
				</tr>
				<?php (new t("Patient.Doesthechildrengotoschool"))->tr()->p(); ?>
				<?php (new t("Patient.Family"))->tr()->p(); ?>
				<?php (new t("Patient.Motherseducation"))->tr()->p(); ?>
				<?php (new t("Patient.Fatherseducation"))->tr()->p(); ?>
				<?php (new t("Patient.Fatherswork"))->tr()->p(); ?>
				<?php (new t("Patient.Motherswork"))->tr()->p(); ?>
				<?php (new t("Patient.Howmanymealperday"))->tr()->p(); ?>
				<?php (new t("Patient.Anyloanforfoodthisyear"))->tr()->p(); ?>
				<?php (new t("Patient.Home"))->tr()->p(); ?>
				<?php (new t("Patient.Roof"))->tr()->p(); ?>
				<?php (new t("Patient.Wall"))->tr()->p(); ?>
				<?php (new t("Patient.Drinkingwaterfromtubewell"))->tr()->p(); ?>
				<?php (new t("Patient.Homesteadgarden"))->tr()->p(); ?>
				<tr>
					<td><hr/></td><td><hr/></td>
				</tr><tr>
					<td><?php label("Patient-CalculatedSocialLevel"); ?></td>
					<td><span catch-it ng-model="folder" tryit="currentFile().calculateSocialLevel()">
						level {{ result | number:0 }}
						</span></td>
				</tr>
				<?php (new t("Patient.Sociallevel"))->tr()->p(); ?>
			</table>
		</fieldset>
	</div>
</div> 