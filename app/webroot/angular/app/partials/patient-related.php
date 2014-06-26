<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<fieldset ng-controller='ctrl_patient'>
	<legend><?php label("Related"); ?></legend>
		<table class='colorize'>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="img/Patient.gif">
					<br/>
					<a class='textbutton' href="#/folder/{{folder.getId()}}">
						<img src="img/go.gif">
						view
					</a>
				</td>
			</tr>
			<tr>
				<td><?php label("Patient.Reference") ?>
				</td>
				<td>
				<? (new t("Patient.entryyear"))->readOnly()->value()->p(); ?>
				-
				<? (new t("Patient.entryorder"))->readOnly()->value()->p(); ?>
				</td>
			</tr>
			<? (new t("Patient.Firstname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Lastname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Fathersname"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Yearofbirth"))->readOnly()->tr()->p(); ?>
			<? (new t("Patient.Sex"))->readOnly()->tr()->p(); ?>
		</tbody>						
	</table>						
</fieldset>
