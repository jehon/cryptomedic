<?
	// For generated ajax, no content is generated here
	return ;
	
	if (!array_key_exists('belongsMode', $this)) {
		$this->belongsMode = 0;
	}

	 if (isset($this->params['url']['template']) && ($this->belongsMode != 1)) return; 
	 if (isset($this->params['url']['regenerate'])) {
		echo '<? echo $this->element("belongsTo"); ?>';
		return;
	 }
	 
?>
<!-- _______ BEGIN <?php echo __FILE__ ?> _______ -->
<fieldset>
	<legend>Related</legend>
		<table>
			<tr>
				<td rowspan='100' align='left'>
					<img src="/amd/cryptomedic/img/Patient.gif">
					<br/>
					<a class='textbutton' href="/amd/patients/view/<? echo $kdm->getValue('Patient.id'); ?>">
						<img src="/amd/cryptomedic/img/go.gif">
						view
					</a>
				</td>
			</tr>
			<tr>
				<td><label for="PatientEntryyear" name="Patient.entryyear">Patient.entryyear</label></td>
				<td><? echo $kdm->makeView('Patient.entryyear'); ?></td>
			</tr><tr>
				<td><label for="PatientEntryorder" name="Patient.entryorder">Patient.entryorder</label></td>
				<td><? echo $kdm->makeView('Patient.entryorder'); ?></td>
			</tr><tr>
				<td><label for="PatientFirstname" name="Patient.Firstname">First name</label></td>
				<td><? echo $kdm->makeView('Patient.Firstname'); ?></td>
			</tr><tr>
				<td><label for="PatientLastname" name="Patient.Lastname">Last name</label></td>
				<td><? echo $kdm->makeView('Patient.Lastname'); ?></td>
			</tr><tr>
				<td><label for="PatientFathersname" name="Patient.Fathersname">Father's name</label></td>
				<td><? echo $kdm->makeView('Patient.Fathersname'); ?></td>
			</tr><tr>
				<td><label for="PatientYearofbirth" name="Patient.Yearofbirth">Year of birth</label></td>
				<td><? echo $kdm->makeView('Patient.Yearofbirth'); ?></td>
			</tr><tr>
				<td><label for="PatientSex" name="Patient.Sex">Sex</label></td>
				<td><? echo $kdm->makeView('Patient.Sex');?></td>
			</tr>
		</tbody>						
	</table>						
</fieldset>
<!-- _______ END <?php echo __FILE__ ?> _______ -->
