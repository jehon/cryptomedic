<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->request->here ?>" accept-charset="utf-8">
	<Div class='searchFields'>
		<Fieldset>
			<Legend>Check for an existing patient, or create it</Legend>
			<Table class='colorize'>
				<tr>
					<td><label for="PatientEntryyear" name="Patient.entryyear">Patient.entryyear</label></td>
					<td>
						<input id='entryyear' name="data[Patient][entryyear]" type="number" value="<? echo $this->data['Patient']['entryyear']; ?>" required="required" myrequired="required" id="PatientEntryyear">
				</tr>
				<tr>
					<td><label for="PatientEntryorder" name="Patient.entryorder">Patient.entryorder</label></td>
					<td>
						<input id='entryorder' name="data[Patient][entryorder]" type="number" value="<? echo $this->data['Patient']['entryorder']; ?>" id="PatientEntryorder">
					</td>
				</tr>
				<input type="hidden" name="data[create]" id="ForceCreate" value=false />	
			</Table>
			<input class="button" id="submitbutton" type="submit" value="Look up">
		</Fieldset>
	</Div>
</form>
<?php
	if (isset($reference)) {
		?>
		<Div class='searchFields'>
			<Fieldset>
				<Legend>Results</Legend>
				<?php
				/*
					if ($reference > 0) {
						?>
						The patient exists. Do you want to see it?
						<a class='textbutton' href="/amd/patients/view/<? echo $reference; ?>">
							<img src="/amd/cryptomedic/img/go.gif" alt=""> View patient</a>
						</span>
						<?
					} else {
				*/
						if ($this->request->data['Patient']['entryorder'] > 0) {
							?>
							The patient does <b>not</b> exist. Do you want to <b>create</b> it?<br><br>
							<a class='textbutton' href="javascript:cryptomedic.reference_submit_for_create();"><img src="/amd/cryptomedic/img/go.gif" alt=""> Create patient</a>
							<?
						} else {
							?>	
							You must specify a valid reference !
							<?
						}
				/*
					}
				*/
				?>
			</fieldset>
		</div>
<?php
 	}
?>
<script>
	jQuery("#entryyear").change(function() { jQuery('#ForceCreate').val(false); });
	jQuery("#entryorder").change(function() { jQuery('#ForceCreate').val(false); });
</script>
