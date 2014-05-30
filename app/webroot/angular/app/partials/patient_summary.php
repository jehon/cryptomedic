<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<fieldset ng-controller='ctrl_patient'>
	<legend>Related</legend>
		<table class='colorize'>
			<tr>
				<td rowspan='100' align='left' width='100px'>
					<img src="img/Patient.gif">
					<br/>
					<a class='textbutton' href="#/patient/<?php rawValue("Patient.id");?>/0">
						<img src="img/go.gif">
						view
					</a>
				</td>
				<td><?php label("Patient.entryyear");?></td>
				<td>
					<?php read("Patient.entryyear"); ?>
				</td>
			</tr><tr>
				<td><?php label("Patient.entryorder");?></td>
				<td><?php read("Patient.entryorder"); ?></td>
			</tr><tr>
				<td><?php label("Patient.Firstname");?></td>
				<td><?php read("Patient.Firstname"); ?></td>
			</tr><tr>
				<td><?php label("Patient.Lastname");?></td>
				<td><?php read("Patient.Lastname"); ?></td>
			</tr><tr>
				<td><?php label("Patient.Fathersname");?></td>
				<td><?php read("Patient.Fathersname"); ?></td>
			</tr><tr>
				<td><?php label("Patient.Yearofbirth");?></td>
				<td><?php read("Patient.Yearofbirth"); ?></td>
			</tr><tr>
				<td><?php label("Patient.Sex");?></td>
				<td><?php read("Patient.Sex"); ?></td>
			</tr>
		</tbody>						
	</table>						
</fieldset>
