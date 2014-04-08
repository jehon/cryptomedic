<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->request->here ?>" accept-charset="utf-8">
	<div class='searchFields'>
		<Fieldset>
			<Legend>Search for...</Legend>
			<table class='colorize'>
				<tr>
					<td><label for="PatientEntryyear" name="Patient.entryyear">Patient.entryyear</label></td>
					<td><div><input name="data[Patient][entryyear]" type="number" value="<? echo $filter['Patient']['entryyear']; ?>" id="PatientEntryyear" /></div></td>
				</tr><tr>
					<td><label for="PatientEntryorder" name="Patient.entryorder">Patient.entryorder</label></td>
					<td><div><input name="data[Patient][entryorder]" type="number" value="<? echo $filter['Patient']['entryorder']; ?>" id="PatientEntryorder" /></div></td>
				</tr><tr>
					<td><label for="PatientFirstname" name="Patient.Firstname">First name</label></td>
					<td><div><input name="data[Patient][Firstname]" type="text" value="<? echo $filter['Patient']['Firstname']; ?>" maxlength="255" id="PatientFirstname" /></div></td>
				</tr><tr>
					<td><label for="PatientLastname" name="Patient.Lastname">Last name</label></td>
					<td><div><input name="data[Patient][Lastname]" type="text" value="<? echo $filter['Patient']['Lastname']; ?>" maxlength="255" id="PatientLastname" /></div></td>
				</tr><tr>
					<td><label for="PatientYearofbirth" name="Patient.Yearofbirth">Year of birth</label></td>
					<td><div><input name="data[Patient][Yearofbirth]" type="number" value="<? echo $filter['Patient']['Yearofbirth']; ?>" id="PatientYearofbirth" /></div></td>
				</tr><tr>
					<td><label for="PatientFathersname" name="Patient.Fathersname">Father's name</label></td>
					<td><div><input name="data[Patient][Fathersname]" type="text" value="<? echo $filter['Patient']['Fathersname']; ?>" maxlength="255" id="PatientFathersname" /></div></td>
				</tr><tr>
					<td><label for="PatientTelephone" name="Patient.Telephone">Telephone</label></td>
					<td><div><input name="data[Patient][Telephone]" type="text" value="<? echo $filter['Patient']['Telephone']; ?>" maxlength="127" id="PatientTelephone" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyRicket" name="Patient.pathology_Ricket">Ricket</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Ricket]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Ricket', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyRicket" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyClubfoot" name="Patient.pathology_Clubfoot">Clubfoot</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Clubfoot]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Clubfoot', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyClubfoot" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyBurn" name="Patient.pathology_Burn">Burn</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Burn]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Burn', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyBurn" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyPolio" name="Patient.pathology_Polio">Polio</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Polio]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Polio', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyPolio" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyCP" name="Patient.pathology_CP">CP</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_CP]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_CP', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyCP" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyCongenital" name="Patient.pathology_Congenital">Congenital</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Congenital]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Congenital', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyCongenital" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyAdult" name="Patient.pathology_Adult">Adult</label></td>
					<td><div><input type="checkbox" name="data[Patient][pathology_Adult]" type="checkbox" value="1" 
						<? if (array_key_exists('pathology_Adult', $filter['Patient'])) echo "checked"; ?>
						id="PatientPathologyAdult" /></div></td>
				</tr><tr>
					<td><label for="PatientPathologyOther" name="Patient.pathology_other">Other pathology</label></td>
					<td><div><input name="data[Patient][pathology_other]" value="<? echo $filter['Patient']['pathology_other']; ?>" maxlength="127" id="PatientPathologyOther" /></div></td>
				</tr>
			</Table>
			<input class="button" type="submit" value="Search" />
		</Fieldset>
	</div>
	<!-- ---------------------------------------------- Search results --------------------------------- -->
	<div id='searchResults'>
	<?php 
	    if (isset($data) && is_array($data) && (count($data) > 0)) {
	            ?>
	            <div style='text-align: center; color: red'>Only the first 100 results are shown</div>
	            <table class='colorize tablesorter' pagesize="10">
	            	<thead>
	            		<tr>
	            			<th></th>
							<th>Entry Year</th>
							<th>Entry Order</th>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Sex</th>
							<th>Yearofbirth</th>
							<th>Fathersname</th>
						</tr>
	            	</thead>
		            <?
		                foreach($data as $zeroitem) {
		                    foreach($zeroitem as $mmodel => $item) {
		                        if ('Patient' != $mmodel)
		                            continue;
		                       	?>
									<tr>
										<td><a href="/amd/patients/view/<? echo $item['id']; ?>#read" class="textbutton">
											<img src="/amd/cryptomedic/img/go.gif" />
											View
										</a></td>
										<td><?php echo $item['entryyear']; ?></td>
										<td><?php echo $item['entryorder']; ?></td>
										<td><?php echo $item['Firstname']; ?></td>
										<td><?php echo $item['Lastname']; ?></td>
										<td><?php echo cryptomedicValue2Label('Patient', 'Sex', $item['Sex']); ?>
										<td><?php echo $item['Yearofbirth']; ?></td>
										<td><?php echo $item['Fathersname']; ?></td>
									</tr>
								<?
		                    }
						}
					?>
					</tbody>
				</table>
				<?
	    } else {
	        echo "No Result Found";
	    }
	?> 
	</div>
</form>