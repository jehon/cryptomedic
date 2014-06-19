<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<span ng-controller="ctrl_patient">
	<div class="col-sm-6">
        <fieldset>
			<legend><label for="Patient-GeneralData" name="Patient-GeneralData">General Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td><?php (new t("Patient.entrynumber"))->label()->p(); ?></td>
					<td><?php (new t("Patient.entryyear"))->read()->p(); ?>-<?php (new t("Patient.entryorder"))->read()->p(); ?></td>
				</tr>				
				<?php (new t("Patient.Firstname"))->tr()->p(); ?>
				<?php (new t("Patient.Lastname"))->tr()->p(); ?>
				<?php (new t("Patient.Sex"))->tr()->p(); ?>
				<tr>
					<td><?php label("Patient.Yearofbirth");?></td>
					<td>
						<?php value("Patient.Yearofbirth", [ "min" => 900, "max" => 2100]); ?>
					</td>
				</tr>
				<tr mode='read'>
					<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
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
			<legend><label for="Patient-Pathology" name="Patient-Pathology">Pathology</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td></td>
					<td id='PatientPathologyError' style='display: none' class='jserror'>
					<label for="Patient-Nopathology" name="Patient-Nopathology">Please select at least one pathology</label>
				</td>
				</tr><tr>
					<td><label for="PatientPathologyRicket" name="Patient.pathology_Ricket">Ricket</label></td>
					<td><?php value("Patient.pathology_Ricket"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyClubfoot" name="Patient.pathology_Clubfoot">Clubfoot</label></td>
					<td><?php value("Patient.pathology_Clubfoot"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyPolio" name="Patient.pathology_Polio">Polio</label></td>
					<td><?php value("Patient.pathology_Polio"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyBurn" name="Patient.pathology_Burn">Burn</label></td>
					<td><?php value("Patient.pathology_Burn"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyCP" name="Patient.pathology_CP">CP</label></td>
					<td><?php value("Patient.pathology_CP"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyCongenital" name="Patient.pathology_Congenital">Congenital</label></td>
					<td><?php value("Patient.pathology_Congenital"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyAdult" name="Patient.pathology_Adult">Adult</label></td>
					<td><?php value("Patient.pathology_Adult"); ?></td>
				</tr><tr>
					<td><label for="PatientPathologyOther" name="Patient.pathology_other">Other pathology</label></td>
					<td><?php value("Patient.pathology_other"); ?></td>
				</tr>
				<?php (new t("Patient.historyofcomplaint"))->tr()->p(); ?>
			</table>
		</fieldset>
		<fieldset>
			<legend><?php label("Patient.Notesforthepatient");?></legend>
			<?php value("Patient.Notesforthepatient"); ?>					
		</fieldset>
	</div>
	<div class="col-sm-6">
		<fieldset>
			<legend><label for="Patient-ChildrenData" name="Patient-ChildrenData">Children Data</label></legend>
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
			<legend><label for="Patient-FamilyData" name="Patient-FamilyData">Family Data</label></legend>
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
			<legend><label for="Patient-SocialData" name="Patient-SocialData">Social Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<?php (new t("Patient.Familysalaryinamonth"))->tr()->p(); ?>
				<?php (new t("Patient.Numberofhouseholdmembers"))->tr()->p(); ?>
				<tr>
					<td>Ratio</td>
					<td><div id='ratio_salary'>TODO: ratio_salary</div></td>
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
					<td>Calculated social level</td><td><span id='calculatedSL'></span></td>
				</tr>
				<?php (new t("Patient.Sociallevel"))->tr()->p(); ?>
			</table>
		</fieldset>
	</div>
</div> 
