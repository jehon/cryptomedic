<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table>
	<? (new t("Patient.entryyear"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.entryorder"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.Firstname"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.Lastname"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.Fathersname"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.Yearofbirth"))->readOnly()->tr()->p(); ?>
	<? (new t("Patient.Sex"))->readOnly()->tr()->p(); ?>
</table>