<?php 
	// Since this page should be included, do not use the default options
	$opt = [ "readOnly" => true, 'baseExpression' => "folder.getMainFile()." ];
?>
<fieldset ng-controller='ctrl_patient' class='related'>
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
			<?php (new t("Patient.Firstname", $opt))->tr()->p(); ?>
			<?php (new t("Patient.Lastname", $opt))->tr()->p(); ?>
			<?php (new t("Patient.Yearofbirth", $opt))->tr("Year of birth")->p(); ?>
			<?php (new t("Patient.Sex", $opt))->tr("Sex")->p(); ?>
		</tbody>						
	</table>						
</fieldset>
