<?php
	t::setDefaultOption("baseExpression", "folder.getFilesRelatedToPatient(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("RicketConsult.RightLeg"))->tr("Right Leg")->p(); ?>
		<?php (new t("RicketConsult.RightlegAngle"))->tr("Right Leg Angle")->p(); ?>
		<?php (new t("RicketConsult.LeftLeg"))->tr("Left Leg")->p(); ?>
		<?php (new t("RicketConsult.LeftlegAngle"))->tr("Left Leg Angle")->p(); ?>
		<?php (new t("RicketConsult.Comments"))->tr("Commentary")->p(); ?>
		<?php (new t("RicketConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<?php (new t("RicketConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
	</tbody>
</table>
