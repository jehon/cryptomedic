<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("RicketConsult.Rightleg"))->tr("Right Leg")->p(); ?>
		<? (new t("RicketConsult.RightlegAngle"))->tr("Right Leg Angle")->p(); ?>
		<? (new t("RicketConsult.Leftleg"))->tr("Left Leg")->p(); ?>
		<? (new t("RicketConsult.LeftlegAngle"))->tr("Left Leg Angle")->p(); ?>
		<? (new t("RicketConsult.Commentary"))->tr("Comment")->p(); ?>
		<? (new t("RicketConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<? (new t("RicketConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
	</tbody>
</table>