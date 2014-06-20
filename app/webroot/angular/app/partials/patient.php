<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<span ng-controller="ctrl_patient">
	<div class="col-sm-6">
        <fieldset>
			<legend><?php (new t("Patient-GeneralData"))->label()->p(); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td><?php (new t("Patient.entrynumber"))->label()->p(); ?></td>
					<td><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></td>
				</tr>
				<?php (new t("Patient.Firstname"))->tr()->p(); ?>
				<?php (new t("Patient.Lastname"))->tr()->p(); ?>
				<?php (new t("Patient.Sex"))->tr()->p(); ?>
				<?php (new t("Patient.Yearofbirth",  [ "min" => 900, "max" => 2100]))->tr()->p(); ?></td>
				<tr class='notModeWrite'>
					<td><?php (new t("Patient-Age"))->label()->p(); ?></td>
					<td>{{currentFile().actualAge()}}</td>
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
			<legend><?php (new t("Patient-Pathology"))->label()->p(); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td></td>
					<td id='PatientPathologyError' style='display: none' class='jserror'>
					<?php (new t("Patient-Nopathology"))->label()->p(); ?>
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
			<legend><?php (new t("Patient.Notesforthepatient"))->label()->p(); ?></legend>
			<?php (new t("Patient.Notesforthepatient"))->value()->p(); ?>					
		</fieldset>
	</div>
	<div class="col-sm-6">
		<fieldset>
			<legend><?php (new t("Patient-ChildrenData"))->label()->p(); ?></legend>
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
			<legend><?php (new t("Patient-FamilyData"))->label()->p(); ?></legend>
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
			<legend><?php (new t("Patient-SocialData"))->label()->p(); ?></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<?php (new t("Patient.Familysalaryinamonth"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofhouseholdmembers"))->tr()->p(); ?>
				<tr>
					<td>Ratio</td>
					<td><div id='ratio_salary'>{{currentFile().ratioSalary()}}</div></td>
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
					<td>Calculated social level</td><td>{{currentFile().calculateSocialLevel()}}</td>
				</tr>
				<?php (new t("Patient.Sociallevel"))->tr()->p(); ?>
			</table>
		</fieldset>
	</div>
</div> 
