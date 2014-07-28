<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
	t::setDefaultOption("readOnly");
?>
<fieldset ng-controller='ctrl_patient' class='related'>
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
				<? (new t("Patient.entryyear"))->value()->p(); ?>
				-
				<? (new t("Patient.entryorder"))->value()->p(); ?>
				</td>
			</tr>
			<? (new t("Patient.Firstname"))->tr()->p(); ?>
			<? (new t("Patient.Lastname"))->tr()->p(); ?>
			<? (new t("Patient.Yearofbirth"))->tr()->p(); ?>
			<? (new t("Patient.Sex"))->tr()->p(); ?>
		</tbody>						
	</table>						
</fieldset>
