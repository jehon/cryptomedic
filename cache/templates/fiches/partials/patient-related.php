<?php
	// Since this page should be included, do not use the default options
	$opt = [ "readOnly" => true, 'baseExpression' => "folder.getMainFile()." ];
?>
<fieldset class='related'>
	<legend>Related Patient</legend>
		<table>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="static/img/patient.gif">
					<br/>
					<a class='textbutton' href="#/folder/{{folder.getId()}}">
						<img src="static/img/go.gif">
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
        <td colspan=2 class='notModeWrite text-center'>
        	<span ng-if="nextAppointment()">
        		<div class='alert alert-info'>
	        		Next appointment: {{nextAppointment()}}
	        	</div>
        	</span>
        	<span ng-if="!nextAppointment()">
        		<div class='alert alert-danger'>
        			No next appointment planned.
	          	<a class='btn btn-default' ng-href="#/folder/{{patient_id}}/file/Appointment">Add an appointment</a>
        		</div>
        	</span>
        </td>
      </tr>
		</tbody>
	</table>
</fieldset>
