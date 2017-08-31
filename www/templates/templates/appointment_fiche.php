<?php
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class='container-fluid' ng-controller='ctrl_file_appointment'>
	<div class='row'>
		<div class="col-md-6">
			<fieldSet>
				<legend>Next appointment</legend>
				<table>
					<tr class='notModeRead'>
						<td>Today</td>
						<td>{{today}}</td>
					</tr>
					<?php (new t("Appointment.Date"))->tr("Entry date")->p(); ?>
					<?php (new t("Appointment.purpose"))->tr("Purpose")->p(); ?>
					<?php (new t("Appointment.Nextappointment"))->tr("Next Appointment")->p(); ?>
					<?php (new t("Appointment.NextCenter"))->tr("Next Center")->p(); ?>
					<tr class='notModeRead'>
						<td>
						</td>
						<td>
							<div class='btn btn-default' ng-click='nextMonth(3)'>Plan in 3 months</div>
							<div class='btn btn-default' ng-click='nextMonth(6)'>Plan in 6 months</div>
						</td>
					</tr>
				</table>
			</fieldSet>
		</div>
		<div class="col-md-6">
			<?php require(__DIR__ . "/../helpers/patient-related.html"); ?>
		</div>
	</div>
</div>
