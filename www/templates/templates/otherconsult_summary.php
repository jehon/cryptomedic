<?php
	t::setDefaultOption("baseExpression", "folder.getFilesRelatedToPatient(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("OtherConsult.Date"))->tr()->p(); ?>
		<?php (new t("OtherConsult.Physiotherapy61"))->tr("Physiotherapy")->p(); ?>
		<?php (new t("OtherConsult.Plaster62"))->tr("Plaster")->p(); ?>
		<?php (new t("OtherConsult.Orthopedicdevice65"))->tr("Orthopedic Device")->p(); ?>
		<?php (new t("OtherConsult.Surgery66"))->tr("Surgery")->p(); ?>
		<?php (new t("OtherConsult.Othertreatment68"))->tr("Other Treatment")->p(); ?>
		<?php (new t("OtherConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<?php (new t("OtherConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
		<?php (new t("OtherConsult.Comment"))->tr("Comment")->p(); ?>
	</tbody>
</table>
