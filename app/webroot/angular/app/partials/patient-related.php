<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<fieldset ng-controller='ctrl_patient'>
	<legend>Related</legend>
		<table class='colorize'>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="img/Patient.gif">
					<br/>
					<a class='textbutton' href="#/patient/{{folder.getId()}}">
						<img src="img/go.gif">
						view
					</a>
				</td>
			</tr>
			<? (new t("Patient.entryyear"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.entryorder"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Firstname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Lastname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Fathersname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Yearofbirth"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Sex"))->readOnly()->tr()->p(); ?>
		</tbody>						
	</table>						
</fieldset>
