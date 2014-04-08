<form id="generalForm" enctype="multipart/form-data" method="post" action="<? echo $this->request->here ?>" accept-charset="utf-8">
	<div style='margin-left: 25%; margin-right: 25%; text-align: center'>
		<fieldset>
			<legend>Consultation informations</legend>
			<form>
				<table width='100%' style='text-align: center'>
					<col width='50%'>
					<col width='50%'>
					<tr>
						<td>Date</td>
						<td><input name='data[filter][Nextappointment]' type='date' value='<? echo $this->data['filter']['Nextappointment']; ?>'><br></td>
					</tr>
					<tr>
						<td>Center</td>
						<td>
							<? 
								echo $this->Form->input('filter.Center', 
									array('options' => cryptomedicGetList('RicketConsult', 'Center', 'any'),
										'label' => false
									));
							?>
						</td>
					</tr>
					<tr>
						<td colspan=2>
							<input type='submit' value='search'>
						</td>
					</tr>
				</table>	
			</form>
		</fieldset>
	</div>
	
	<table class='colorize tablesorter' pagesize=100>
		<tr>
			<th>Type</th>
			<th>Center</th>
			<th>Patient</th>
			<th>Name</th>
			<th>Phone</th>
			<th>Appointment from Date</th>
		</tr>
	<?
		foreach($this->data['list'] as $d) {
			$pat = $d['Patient'];
			unset($d['Patient']);
			$type = array_keys($d);
			$type = $type[0];
			$dd = array_pop($d);
			echo "<tr><td>" 
				. $type 
				. "</td><td>"
				. cryptomedicValue2Label("RicketConsult", "Center", $dd['Center']) 
				. "</td><td>" 
				. "<a href='/amd/patients/view/" . $pat['id'] . "'>view</a> " 
					. $pat['entryyear'] . "-" . $pat['entryorder']
				. "</td><td>" 
				. $pat['Firstname'] . " ". $pat['Lastname'] 
				. "</td><td>"
				. $pat['Telephone'] 
				. "</td><td>" 
				. "<a href='/amd/patients/view/" . $pat['id'] . "#related/" . $dd['relatedid'] . "/read'>view</a> " 
				. substr($dd['Date'], 0, 10) 
				. "</td></tr>";
		}
	?>
	</table>
</form>