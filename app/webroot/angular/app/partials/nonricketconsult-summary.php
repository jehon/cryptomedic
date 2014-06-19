<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("NonricketConsult.Date"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Physiotherapy61"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Plaster62"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Orthopedicdevice65"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Surgery66"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Othertreatment68"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Heightcm"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Weightkg"))->readOnly()->tr()->p(); ?>
		<? (new t("NonricketConsult.Comment"))->readOnly()->tr()->p(); ?>
	</tbody>
</table>
