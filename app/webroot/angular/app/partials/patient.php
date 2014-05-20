<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<div id='patient_content'>
        <div modes='read'>
            Get a complete report:
                <a target="_new" href="/amd/patients/view/{{Patient.id}}.csv" >csv</a>&nbsp
                <a target="_new" href="/amd/patients/view/{{Patient.id}}.csv?fr=1" >french-csv</a>&nbsp
                <a target="_new" href="/amd/patients/view/{{Patient.id}}.xls" >xls</a>&nbsp
        </div>
	<div class="col-sm-6">
        <fieldset>
				<legend><label for="Patient-GeneralData" name="Patient-GeneralData">General Data</label></legend>
				<table class='colorize'>
					<col width='30%' /><col width='*' />
					<tr>
						<td><label for="PatientEntrynumber" name="Patient.entrynumber">Entry Number</label></td>
						<td>
							<?php read("Patient.entryyear"); ?>-<?php read("Patient.entryorder"); ?>									
						</td>
					</tr><tr>
						<td><label for="PatientFirstname" name="Patient.Firstname">First name</label></td>
						<td><?php value("Patient.Firstname"); ?></td>
					</tr><tr>
						<td><label for="PatientLastname" name="Patient.Lastname">Last name</label></td>
						<td><?php value("Patient.Lastname"); ?></td>
					</tr><tr>
						<td><label for="PatientSex" name="Patient.Sex">Sex</label></td>
						<td><?php value("Patient.Sex"); ?></td>
					</tr><tr>
						<td><label for="PatientYearofbirth" name="Patient.Yearofbirth">Year of birth</label></td>
						<td>
							<?php value("Patient.Yearofbirth", [ "min" => 900, "max" => 2100]); ?>
						</td>
					</tr><tr mode='read'>
						<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
						<td>{{stats_base_actualage}}</td>
					</tr><tr>
						<td><label for="PatientFathersname" name="Patient.Fathersname">Father's name</label></td>
						<td><?php value("Patient.Fathersname", ""); ?></td>
					</tr><tr>
						<td><label for="PatientDistrict" name="Patient.District">District</label></td>
						<td><?php value("Patient.District"); ?></td>
					</tr><tr>
						<td><label for="PatientUpazilla" name="Patient.Upazilla">Upazilla</label></td>
						<td><?php value("Patient.Upazilla"); ?></td>
					</tr><tr>
						<td><label for="PatientUnion" name="Patient.Union_">Union</label></td>
						<td><?php value("Patient.Union_"); ?></td>
					</tr><tr>
						<td><label for="PatientTelephone" name="Patient.Telephone">Telephone</label></td>
						<td><?php value("Patient.Telephone"); ?></td>
					</tr><tr>
						<td><label for="PatientAddressNotes" name="Patient.AddressNotes">Address Notes</label></td>
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
					<td><label for="PatientHistoryofcomplaint" name="Patient.historyofcomplaint">History of complaint</label></td>
					<td><?php value("Patient.historyofcomplaint"); ?></td>
				</tr>
			</table>
		</fieldset>
		<fieldset>
			<legend><label for="PatientNotesforthepatient" name="Patient.Notesforthepatient">Notes</label></legend>
			<?php value("Patient.Notesforthepatient"); ?>					
		</fieldset>
	</div>
	<div class="col-sm-6">
		<fieldset>
			<legend><label for="Patient-ChildrenData" name="Patient-ChildrenData">Children Data</label></legend>
			<table class='colorize'>
				<col width='30%' /><col width='*' /> 
				<tr>
					<td><label for="PatientRowofthechildreninthefamily" name="Patient.Rowofthechildreninthefamily">Row of the children in the family</label></td>
					<td><?php value("Patient.Rowofthechildreninthefamily"); ?></td>
				</tr><tr>
					<td><label for="PatientAgeofweaningmonth" name="Patient.Ageofweaningmonth">Age of weaning (month)</label></td>
					<td><?php value("Patient.Ageofweaningmonth"); ?></td>
				</tr><tr>
					<td><label for="PatientAgeofdiversificationofthefoodmonth" name="Patient.Ageofdiversificationofthefoodmonth">Age of diversification of the food (month)</label></td>
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
					<td><label for="PatientReligion" name="Patient.Religion">Religion</label></td>
					<td><?php value("Patient.Religion"); ?></td>
				</tr><tr>
					<td><label for="PatientConsanguineousfamily" name="Patient.Consanguineousfamily">Consanguineous family</label></td>
					<td><?php value("Patient.Consanguineousfamily"); ?></td>
				</tr><tr>
					<td><label for="PatientNumberofpregnacy" name="Patient.Numberofpregnacy">Number of pregnancy</label></td>
					<td><?php value("Patient.Numberofpregnacy"); ?></td>
				</tr><tr>
					<td><label for="PatientNumberofbrothersandsisters" name="Patient.Numberofbrothersandsisters">Number of brothers and sisters</label></td>
					<td><?php value("Patient.Numberofbrothersandsisters"); ?></td>
				</tr><tr>
					<td><label for="PatientNumberofbrothersandsistersaffectedbyrickets" name="Patient.Numberofbrothersandsistersaffectedbyrickets">Number of brothers and sisters affected by rickets</label></td>
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
					<td><label for="PatientFamilysalaryinamonth" name="Patient.Familysalaryinamonth">Family income in month (Tk)</label></td>
					<td><?php value("Patient.Familysalaryinamonth"); ?></td>
				</tr><tr>
					<td><label for="PatientNumberofhouseholdmembers" name="Patient.Numberofhouseholdmembers">Number of household members</label></td>
					<td><?php value("Patient.Numberofhouseholdmembers"); ?></td>
				</tr><tr>
					<td>Ratio</td>
					<td><div id='ratio_salary'></div></td>
				</tr><tr>
					<td><label for="PatientDoesthechildrengotoschool" name="Patient.Doesthechildrengotoschool">Does the children go to school</label></td>
					<td><?php value("Patient.Doesthechildrengotoschool"); ?></td>
				</tr><tr>
					<td><label for="PatientFamily" name="Patient.Family">Family</label></td>
					<td><?php value("Patient.Family"); ?></td>
				</tr><tr>
					<td><label for="PatientMotherseducation" name="Patient.Motherseducation">Mother's education</label></td>
					<td><?php value("Patient.Motherseducation"); ?></td>
				</tr><tr>
					<td><label for="PatientFatherseducation" name="Patient.Fatherseducation">Father's education</label></td>
					<td><?php value("Patient.Fatherseducation"); ?></td>
				</tr><tr>
					<td><label for="PatientFatherswork" name="Patient.Fatherswork">Father's work</label></td>
					<td><?php value("Patient.Fatherswork"); ?></td>
				</tr><tr>
					<td><label for="PatientMotherswork" name="Patient.Motherswork">Mother's work</label></td>
					<td><?php value("Patient.Motherswork"); ?></td>
				</tr><tr>
					<td><label for="PatientHowmanymealperday" name="Patient.Howmanymealperday">How many meal per day</label></td>
					<td><?php value("Patient.Howmanymealperday"); ?></td>
				</tr><tr>
					<td><label for="PatientAnyloanforfoodthisyear" name="Patient.Anyloanforfoodthisyear">Any loan for food this year</label></td>
					<td><?php value("Patient.Anyloanforfoodthisyear"); ?></td>
				</tr><tr>
					<td><label for="PatientHome" name="Patient.Home">Home</label></td>
					<td><?php value("Patient.Home"); ?></td>
				</tr><tr>
					<td><label for="PatientRoof" name="Patient.Roof">Roof</label></td>
					<td><?php value("Patient.Roof"); ?></td>
				</tr><tr>
					<td><label for="PatientWall" name="Patient.Wall">Wall</label></td>
					<td><?php value("Patient.Wall"); ?></td>
				</tr><tr>
					<td><label for="PatientDrinkingwaterfromtubewell" name="Patient.Drinkingwaterfromtubewell">Drinking water from tube well</label></td>
					<td><?php value("Patient.Drinkingwaterfromtubewell"); ?></td>
				</tr><tr>
					<td><label for="PatientHomesteadgarden" name="Patient.Homesteadgarden">Homestead garden</label></td>
					<td><?php value("Patient.Homesteadgarden"); ?></td>
				</tr><tr>
					<td><hr/></td><td><hr/></td>
				</tr><tr>
					<td>Calculated social level</td><td><span id='calculatedSL'></span></td>
				</tr><tr>
					<td><label for="PatientSociallevel" name="Patient.Sociallevel">Social level</label></td>
					<td><?php value("Patient.Sociallevel"); ?></td>
					</tr>
			</table>
		</fieldset>
	</div>
</div> 
