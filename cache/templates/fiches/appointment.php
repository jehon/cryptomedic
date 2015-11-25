<?php
	t::setDefaultOption("baseExpression", "currentFile().");
?>
<div class='container-fluid'>
	<div class='row'>
		<div class="col-lg-6">
			<fieldSet>
				<legend>Next appointment</legend>
				<table>
					<?php (new t("Appointment.Date"))->tr("Today's Date")->p(); ?>
					<?php (new t("Appointment.Nextappointment"))->tr("Next Appointment")->p(); ?>
					<?php (new t("Appointment.NextCenter"))->tr("Next Center")->p(); ?>
				</table>
			</fieldSet>
		</div>
		<div class="col-lg-6">
			<?php require("partials/patient-related.php"); ?>
		</div>
	</div>
</div>
