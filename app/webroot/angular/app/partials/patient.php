<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<span ng-controller="ctrl_patient">
	<div class="col-sm-6">
        <fieldset>
			<legend><label for="Patient-GeneralData" name="Patient-GeneralData">General Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' />
				<tr>
					<td><?php label("Patient.entrynumber");?>
					<td><?php read("Patient.entryyear"); ?>-<?php read("Patient.entryorder"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Firstname");?></td>
					<td><?php value("Patient.Firstname"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Lastname");?></td>
					<td><?php value("Patient.Lastname"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Sex");?></td>
					<td><?php value("Patient.Sex"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Yearofbirth");?></td>
					<td>
						<?php value("Patient.Yearofbirth", [ "min" => 900, "max" => 2100]); ?>
					</td>
				</tr><tr mode='read'>
					<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
					<td>{{currentFile().actualAge()}}</td>
				</tr><tr>
					<td><?php label("Patient.Fathersname");?></td>
					<td><?php value("Patient.Fathersname", ""); ?></td>
				</tr><tr>
					<td><?php label("Patient.District");?></td>
					<td><?php value("Patient.District"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Upazilla");?></td>
					<td><?php value("Patient.Upazilla"); ?></td>
				</tr><tr>
					<td><label for="PatientUnion" name="Patient.Union_">Union</label></td>
					<td><?php value("Patient.Union_"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Telephone");?></td>
					<td><?php value("Patient.Telephone"); ?></td>
				</tr><tr>
					<td><?php label("Patient.AddressNotes");?></td>
					<td><?php value("Patient.AddressNotes"); ?></td>
				</tr>
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
				</tr><tr>
					<td><?php label("Patient.historyofcomplaint");?></td>
					<td><?php value("Patient.historyofcomplaint"); ?></td>
				</tr>
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
				<tr>
					<td><?php label("Patient.Rowofthechildreninthefamily");?></td>
					<td><?php value("Patient.Rowofthechildreninthefamily"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Ageofweaningmonth");?></td>
					<td><?php value("Patient.Ageofweaningmonth"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Ageofdiversificationofthefoodmonth");?></td>
					<td><?php value("Patient.Ageofdiversificationofthefoodmonth"); ?></td>
				</tr><tr>
					<td><label for="PatientDiseaseDiarrhoea" name="Patient.disease_diarrhoea">Diarrhoea</label></td>
					<td><?php value("Patient.disease_diarrhoea"); ?></td>
				</tr><tr>
					<td><label for="PatientDiseaseRespiratoryInfection" name="Patient.disease_respiratory_infection">Respiratory infection</label></td>
					<td><?php value("Patient.disease_respiratory_infection"); ?></td>
				</tr><tr>
					<td><label for="PatientDiseaseMalaria" name="Patient.disease_malaria">Malaria</label></td>
					<td><?php value("Patient.disease_malaria"); ?></td>
				</tr><tr>
					<td><label for="PatientDiseaseTyphoid" name="Patient.disease_typhoid">Typhoid</label></td>
					<td><?php value("Patient.disease_typhoid"); ?></td>
				</tr>
			</table>
		</fieldset>
		<br/>
		<fieldset>
			<legend><label for="Patient-FamilyData" name="Patient-FamilyData">Family Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<tr>
					<td><?php label("Patient.Religion");?></td>
					<td><?php value("Patient.Religion"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Consanguineousfamily");?></td>
					<td><?php value("Patient.Consanguineousfamily"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Numberofpregnacy");?></td>
					<td><?php value("Patient.Numberofpregnacy"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Numberofbrothersandsisters");?></td>
					<td><?php value("Patient.Numberofbrothersandsisters"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Numberofbrothersandsistersaffectedbyrickets");?></td>
					<td><?php value("Patient.Numberofbrothersandsistersaffectedbyrickets"); ?></td>
				</tr>
			</table>
		</fieldset>
		<br/>
		<fieldset>
			<legend><label for="Patient-SocialData" name="Patient-SocialData">Social Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<tr>
					<td><?php label("Patient.Familysalaryinamonth");?></td>
					<td><?php value("Patient.Familysalaryinamonth"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Numberofhouseholdmembers");?></td>
					<td><?php value("Patient.Numberofhouseholdmembers"); ?></td>
				</tr><tr>
					<td>Ratio</td>
					<td><div id='ratio_salary'></div></td>
				</tr><tr>
					<td><?php label("Patient.Doesthechildrengotoschool");?></td>
					<td><?php value("Patient.Doesthechildrengotoschool"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Family");?></td>
					<td><?php value("Patient.Family"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Motherseducation");?></td>
					<td><?php value("Patient.Motherseducation"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Fatherseducation");?></td>
					<td><?php value("Patient.Fatherseducation"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Fatherswork");?></td>
					<td><?php value("Patient.Fatherswork"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Motherswork");?></td>
					<td><?php value("Patient.Motherswork"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Howmanymealperday");?></td>
					<td><?php value("Patient.Howmanymealperday"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Anyloanforfoodthisyear");?></td>
					<td><?php value("Patient.Anyloanforfoodthisyear"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Home");?></td>
					<td><?php value("Patient.Home"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Roof");?></td>
					<td><?php value("Patient.Roof"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Wall");?></td>
					<td><?php value("Patient.Wall"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Drinkingwaterfromtubewell");?></td>
					<td><?php value("Patient.Drinkingwaterfromtubewell"); ?></td>
				</tr><tr>
					<td><?php label("Patient.Homesteadgarden");?></td>
					<td><?php value("Patient.Homesteadgarden"); ?></td>
				</tr><tr>
					<td><hr/></td><td><hr/></td>
				</tr><tr>
					<td>Calculated social level</td><td><span id='calculatedSL'></span></td>
				</tr><tr>
					<td><?php label("Patient.Sociallevel");?></td>
					<td><?php value("Patient.Sociallevel"); ?></td>
					</tr>
			</table>
		</fieldset>
	</div>
</div> 
