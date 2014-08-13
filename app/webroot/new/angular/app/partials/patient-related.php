<?php 
	require_once(__DIR__ . "/../../../../../../../rest/php/templates.php");
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
	t::setDefaultOption("readOnly");
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
				<? (new t("Patient.entryyear"))->value()->p(); ?>
				-
				<? (new t("Patient.entryorder"))->value()->p(); ?>
				</td>
			</tr>
			<? (new t("Patient.Firstname"))->tr()->p(); ?>
			<? (new t("Patient.Lastname"))->tr()->p(); ?>
			<? (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
			<? (new t("Patient.Sex"))->tr("Sex")->p(); ?>
		</tbody>						
	</table>						
</fieldset>
