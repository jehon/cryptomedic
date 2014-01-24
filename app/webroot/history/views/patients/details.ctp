<div id='patient_content'>
	<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->here ?>" accept-charset="utf-8">
		<div id='headerContainer' class='headerContainer'></div>
		<input type="hidden" name="_method" value="PUT" />
		<input type="hidden" name="data[id]" value="<? echo $kdm->getValue('Patient.id'); ?>" />
		<input type="hidden" name="data[type]" value="Patient" />
		Get a complete csv report: <a target="_new" href="/amd/patients/export/<? echo $kdm->getValue('Patient.id'); ?>" >csv report</a>
		<table width='100%'>
			<col width='45%' />
			<col width='45%' />
			<col width='*' />
			<tr>
				<td>
					<fieldset>
						<legend><label for="Patient-GeneralData" name="Patient-GeneralData">General Data</label></legend>
						<table class='colorize'>
							<col width='30%' /><col width='*' />
							<tr>
								<td><label for="PatientEntrynumber" name="Patient.entrynumber">Entry Number</label></td>
								<td>
									<? echo $kdm->makeView('Patient.entryyear'); ?>-<? echo $kdm->makeView('Patient.entryorder'); ?>
									<input type="hidden" name="data[entryyear]" value="<? echo $kdm->getValue('Patient.entryyear'); ?>" id="PatientEntryyear" />
									<input type="hidden" name="data[entryorder]" value="<? echo $kdm->getValue('Patient.entryorder'); ?>" id="PatientEntryorder" />
								</td>
							</tr><tr>
								<td><label for="PatientFirstname" name="Patient.Firstname">First name</label></td>
								<td><? echo $kdm->makeInput('Patient.Firstname'); ?></td>
							</tr><tr>
								<td><label for="PatientLastname" name="Patient.Lastname">Last name</label></td>
								<td><? echo $kdm->makeInput('Patient.Lastname'); ?></td>
							</tr><tr>
								<td><label for="PatientSex" name="Patient.Sex">Sex</label></td>
								<td><? echo $kdm->makeInput('Patient.Sex'); ?></td>
							</tr><tr>
								<td><label for="PatientYearofbirth" name="Patient.Yearofbirth">Year of birth</label></td>
								<td>
									<? echo $kdm->makeInput('Patient.Yearofbirth', array('min' => 1900, 'max' => '2100')); ?>
								</td>
							</tr><tr mode='read'>
								<td><label for="Patient-Age" name="Patient-Age">Age</label></td>
								<td><span id='stats_base_actualage'></span></td>
							</tr><tr>
								<td><label for="PatientFathersname" name="Patient.Fathersname">Father's name</label></td>
								<td><? echo $kdm->makeInput('Patient.Fathersname'); ?></td>
							</tr><tr>
								<td><label for="PatientDistrict" name="Patient.District">District</label></td>
								<td><? echo $kdm->makeInput('Patient.District'); ?></td>
							</tr><tr>
								<td><label for="PatientUpazilla" name="Patient.Upazilla">Upazilla</label></td>
								<td><? echo $kdm->makeInput('Patient.Upazilla'); ?></td>
							</tr><tr>
								<td><label for="PatientUnion" name="Patient.Union_">Union</label></td>
								<td><? echo $kdm->makeInput('Patient.Union_'); ?></td>
							</tr><tr>
								<td><label for="PatientTelephone" name="Patient.Telephone">Telephone</label></td>
								<td><? echo $kdm->makeInput('Patient.Telephone'); ?></td>
							</tr><tr>
								<td><label for="PatientAddressNotes" name="Patient.AddressNotes">Address Notes</label></td>
								<td><? echo $kdm->makeInput('Patient.AddressNotes'); ?></td>
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
								<td><? echo $kdm->makeInput('Patient.pathology_Ricket'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyClubfoot" name="Patient.pathology_Clubfoot">Clubfoot</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_Clubfoot'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyPolio" name="Patient.pathology_Polio">Polio</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_Polio'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyBurn" name="Patient.pathology_Burn">Burn</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_Burn'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyCP" name="Patient.pathology_CP">CP</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_CP'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyCongenital" name="Patient.pathology_Congenital">Congenital</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_Congenital'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyAdult" name="Patient.pathology_Adult">Adult</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_Adult'); ?></td>
							</tr><tr>
								<td><label for="PatientPathologyOther" name="Patient.pathology_other">Other pathology</label></td>
								<td><? echo $kdm->makeInput('Patient.pathology_other'); ?></td>
							</tr><tr>
								<td><label for="PatientHistoryofcomplaint" name="Patient.historyofcomplaint">History of complaint</label></td>
								<td><? echo $kdm->makeInput('Patient.historyofcomplaint'); ?></td>
							</tr>
						</table>
					</fieldset>
					<fieldset>
						<legend><label for="PatientNotesforthepatient" name="Patient.Notesforthepatient">Notes</label></legend>
						<? echo $kdm->makeInput('Patient.Notesforthepatient'); ?>
					</fieldset>
				</td>
				<td>
					<fieldset>
						<legend><label for="Patient-ChildrenData" name="Patient-ChildrenData">Children Data</label></legend>
						<table class='colorize'>
							<col width='30%' /><col width='*' /> 
							<tr>
								<td><label for="PatientRowofthechildreninthefamily" name="Patient.Rowofthechildreninthefamily">Row of the children in the family</label></td>
								<td><? echo $kdm->makeInput('Patient.Rowofthechildreninthefamily'); ?></td>
							</tr><tr>
								<td><label for="PatientAgeofweaningmonth" name="Patient.Ageofweaningmonth">Age of weaning (month)</label></td>
								<td><? echo $kdm->makeInput('Patient.Ageofweaningmonth'); ?></td>
							</tr><tr>
								<td><label for="PatientAgeofdiversificationofthefoodmonth" name="Patient.Ageofdiversificationofthefoodmonth">Age of diversification of the food (month)</label></td>
								<td><? echo $kdm->makeInput('Patient.Ageofdiversificationofthefoodmonth'); ?></td>
							</tr><tr>
								<td><label for="PatientDiseaseDiarrhoea" name="Patient.disease_diarrhoea">Diarrhoea</label></td>
								<td><? echo $kdm->makeInput('Patient.disease_diarrhoea'); ?></td>
							</tr><tr>
								<td><label for="PatientDiseaseRespiratoryInfection" name="Patient.disease_respiratory_infection">Respiratory infection</label></td>
								<td><? echo $kdm->makeInput('Patient.disease_respiratory_infection'); ?></td>
							</tr><tr>
								<td><label for="PatientDiseaseMalaria" name="Patient.disease_malaria">Malaria</label></td>
								<td><? echo $kdm->makeInput('Patient.disease_malaria'); ?></td>
							</tr><tr>
								<td><label for="PatientDiseaseTyphoid" name="Patient.disease_typhoid">Typhoid</label></td>
								<td><? echo $kdm->makeInput('Patient.disease_typhoid'); ?></td>
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
								<td><? echo $kdm->makeInput('Patient.Religion'); ?></td>
							</tr><tr>
								<td><label for="PatientConsanguineousfamily" name="Patient.Consanguineousfamily">Consanguineous family</label></td>
								<td><? echo $kdm->makeInput('Patient.Consanguineousfamily'); ?></td>
							</tr><tr>
								<td><label for="PatientNumberofpregnacy" name="Patient.Numberofpregnacy">Number of pregnancy</label></td>
								<td><? echo $kdm->makeInput('Patient.Numberofpregnacy'); ?></td>
							</tr><tr>
								<td><label for="PatientNumberofbrothersandsisters" name="Patient.Numberofbrothersandsisters">Number of brothers and sisters</label></td>
								<td><? echo $kdm->makeInput('Patient.Numberofbrothersandsisters'); ?></td>
							</tr><tr>
								<td><label for="PatientNumberofbrothersandsistersaffectedbyrickets" name="Patient.Numberofbrothersandsistersaffectedbyrickets">Number of brothers and sisters affected by rickets</label></td>
								<td><? echo $kdm->makeInput('Patient.Numberofbrothersandsistersaffectedbyrickets'); ?></td>
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
								<td><? echo $kdm->makeInput('Patient.Familysalaryinamonth'); ?></td>
							</tr><tr>
								<td><label for="PatientNumberofhouseholdmembers" name="Patient.Numberofhouseholdmembers">Number of household members</label></td>
								<td><? echo $kdm->makeInput('Patient.Numberofhouseholdmembers'); ?></td>
							</tr><tr>
								<td>Ratio</td>
								<td><div id='ratio_salary' modes='read'>unspecified</div></td>
							</tr><tr>
								<td><label for="PatientDoesthechildrengotoschool" name="Patient.Doesthechildrengotoschool">Does the children go to school</label></td>
								<td><? echo $kdm->makeInput('Patient.Doesthechildrengotoschool'); ?></td>
							</tr><tr>
								<td><label for="PatientFamily" name="Patient.Family">Family</label></td>
								<td><? echo $kdm->makeInput('Patient.Family'); ?></td>
							</tr><tr>
								<td><label for="PatientMotherseducation" name="Patient.Motherseducation">Mother's education</label></td>
								<td><? echo $kdm->makeInput('Patient.Motherseducation'); ?></td>
							</tr><tr>
								<td><label for="PatientFatherseducation" name="Patient.Fatherseducation">Father's education</label></td>
								<td><? echo $kdm->makeInput('Patient.Fatherseducation'); ?></td>
							</tr><tr>
								<td><label for="PatientFatherswork" name="Patient.Fatherswork">Father's work</label></td>
								<td><? echo $kdm->makeInput('Patient.Fatherswork'); ?></td>
							</tr><tr>
								<td><label for="PatientMotherswork" name="Patient.Motherswork">Mother's work</label></td>
								<td><? echo $kdm->makeInput('Patient.Motherswork'); ?></td>
							</tr><tr>
								<td><label for="PatientHowmanymealperday" name="Patient.Howmanymealperday">How many meal per day</label></td>
								<td><? echo $kdm->makeInput('Patient.Howmanymealperday'); ?></td>
							</tr><tr>
								<td><label for="PatientAnyloanforfoodthisyear" name="Patient.Anyloanforfoodthisyear">Any loan for food this year</label></td>
								<td><? echo $kdm->makeInput('Patient.Anyloanforfoodthisyear'); ?></td>
							</tr><tr>
								<td><label for="PatientHome" name="Patient.Home">Home</label></td>
								<td><? echo $kdm->makeInput('Patient.Home'); ?></td>
							</tr><tr>
								<td><label for="PatientRoof" name="Patient.Roof">Roof</label></td>
								<td><? echo $kdm->makeInput('Patient.Roof'); ?></td>
							</tr><tr>
								<td><label for="PatientWall" name="Patient.Wall">Wall</label></td>
								<td><? echo $kdm->makeInput('Patient.Wall'); ?></td>
							</tr><tr>
								<td><label for="PatientDrinkingwaterfromtubewell" name="Patient.Drinkingwaterfromtubewell">Drinking water from tube well</label></td>
								<td><? echo $kdm->makeInput('Patient.Drinkingwaterfromtubewell'); ?></td>
							</tr><tr>
								<td><label for="PatientHomesteadgarden" name="Patient.Homesteadgarden">Homestead garden</label></td>
								<td><? echo $kdm->makeInput('Patient.Homesteadgarden'); ?></td>
							</tr><tr>
								<td><hr/></td><td><hr/></td>
							</tr><tr>
								<td><label for="PatientSociallevel" name="Patient.Sociallevel">Social level</label></td>
								<td><? echo $kdm->makeInput('Patient.Sociallevel'); ?></td>
								</tr>
						</table>
					</fieldset>
				</td>
			</tr>
		</table>
	</form>
</div> 
