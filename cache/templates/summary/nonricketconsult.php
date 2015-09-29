<?php 
	t::setDefaultOption("baseExpression", "folder.getSubFile(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("NonricketConsult.Date"))->tr()->p(); ?>
		<?php (new t("NonricketConsult.Physiotherapy61"))->tr("Physiotherapy")->p(); ?>
		<?php (new t("NonricketConsult.Plaster62"))->tr("Plaster")->p(); ?>
		<?php (new t("NonricketConsult.Orthopedicdevice65"))->tr("Orthopedic Device")->p(); ?>
		<?php (new t("NonricketConsult.Surgery66"))->tr("Surgery")->p(); ?>
		<?php (new t("NonricketConsult.Othertreatment68"))->tr("Other Treatment")->p(); ?>
		<?php (new t("NonricketConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<?php (new t("NonricketConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
		<?php (new t("NonricketConsult.Comment"))->tr("Comment")->p(); ?>
	</tbody>
</table>
