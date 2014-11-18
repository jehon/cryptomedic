<?php 
// 	t::setDefaultOption("baseExpression", "folder.getMainFile().");
// 	t::setDefaultOption("readOnly");
	// Since this page should be included, do not use the default options
	$opt = [ "readOnly" => true, 'baseExpression' => "folder.getMainFile()." ];
?>
<fieldset ng-controller='ctrl_patient' class='related'>
	<legend>Related Patient</legend>
		<table>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="img/patient.gif">
					<br/>
					<a class='textbutton' href="#/folder/{{folder.getId()}}">
						<img src="img/go.gif">
						view
					</a>
				</td>
			</tr>
			<tr>
				<td><label>Reference</label></td>
				<td>
				<? (new t("Patient.entryyear", $opt))->value()->p(); ?>
				-
				<? (new t("Patient.entryorder", $opt))->value()->p(); ?>
				</td>
			</tr>
			<? (new t("Patient.Firstname", $opt))->tr()->p(); ?>
			<? (new t("Patient.Lastname", $opt))->tr()->p(); ?>
			<? (new t("Patient.Yearofbirth", $opt))->tr("Year of birth")->p(); ?>
			<? (new t("Patient.Sex", $opt))->tr("Sex")->p(); ?>
		</tbody>						
	</table>						
</fieldset>
