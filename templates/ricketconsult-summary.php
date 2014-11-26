<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<? (new t("RicketConsult.RightLeg"))->tr("Right Leg")->p(); ?>
		<? (new t("RicketConsult.RightlegAngle"))->tr("Right Leg Angle")->p(); ?>
		<? (new t("RicketConsult.LeftLeg"))->tr("Left Leg")->p(); ?>
		<? (new t("RicketConsult.LeftlegAngle"))->tr("Left Leg Angle")->p(); ?>
		<? (new t("RicketConsult.Commentary"))->tr("Comment")->p(); ?>
		<? (new t("RicketConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<? (new t("RicketConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
	</tbody>
</table>