<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("NonricketConsult.Date"))->tr()->p(); ?>
		<? (new t("NonricketConsult.Physiotherapy61"))->tr("Physiotherapy")->p(); ?>
		<? (new t("NonricketConsult.Plaster62"))->tr("Plaster")->p(); ?>
		<? (new t("NonricketConsult.Orthopedicdevice65"))->tr("Orthopedic Device")->p(); ?>
		<? (new t("NonricketConsult.Surgery66"))->tr("Surgery")->p(); ?>
		<? (new t("NonricketConsult.Othertreatment68"))->tr("Other Treatment")->p(); ?>
		<? (new t("NonricketConsult.Heightcm"))->tr("Height (cm)")->p(); ?>
		<? (new t("NonricketConsult.Weightkg"))->tr("Weight (kg)")->p(); ?>
		<? (new t("NonricketConsult.Comment"))->tr("Comment")->p(); ?>
	</tbody>
</table>
