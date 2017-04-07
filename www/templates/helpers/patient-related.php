<?php
	// Since this page should be included, do not use the default options
	$opt = [ "readOnly" => true, 'baseExpression' => "folder.getPatient()." ];
?>
<fieldset class='related'>
	<legend>Related Patient</legend>
	<table>
		<tbody>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="/static/img/patient.gif">
					<br/>
					<a class='textbutton' href="#/folder/{{folder.getId()}}">
						<img src="/static/img/go.gif">
						view
					</a>
				</td>
			</tr>
			<tr>
				<td><label>Reference</label></td>
				<td>
				<?php (new t("Patient.entryyear", $opt))->value()->p(); ?>
				-
				<?php (new t("Patient.entryorder", $opt))->value()->p(); ?>
				</td>
			</tr>
			<?php (new t("Patient.Name", $opt))->tr()->p(); ?>
			<?php (new t("Patient.Yearofbirth", $opt))->tr("Year of birth")->p(); ?>
			<?php (new t("Patient.Sex", $opt))->tr("Sex")->p(); ?>

      <tr>
      </tr>
		</tbody>
	</table>
</fieldset>
<fieldset class='related'>
	<legend>Agenda</legend>
	<table>
		<tbody>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="/static/img/consultOfDay.gif" width='75px'>
				</td>
        <td class='text-center'>
        	<div ng-if="nextAppointment()" class='alert alert-info' style='margin-bottom: 0px'>
        		Next appointment: {{nextAppointment()}}
        	</div>
        	<div ng-if="!nextAppointment()" class='alert alert-danger' style='margin-bottom: 0px'>
      			No next appointment planned.
          	<a class='notModeWrite btn btn-default' ng-href="#/folder/{{patient_id}}/file/Appointment">Add an appointment</a>
        	</div>
        </td>
		</tbody>
	</table>
</fieldset>
