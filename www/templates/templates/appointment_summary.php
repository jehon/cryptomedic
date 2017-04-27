<?php
	t::setDefaultOption("baseExpression", "folder.getFilesRelatedToPatient(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("Appointment.NextAppointment"))->tr()->p(); ?>
		<?php (new t("Appointment.NextCenter"))->tr()->p(); ?>
	</tbody>
</table>
