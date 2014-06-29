<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table>
	<? (new t("Patient.entryyear"))->tr()->p(); ?>
	<? (new t("Patient.entryorder"))->tr()->p(); ?>
	<? (new t("Patient.Firstname"))->tr()->p(); ?>
	<? (new t("Patient.Lastname"))->tr()->p(); ?>
	<? (new t("Patient.Fathersname"))->tr()->p(); ?>
	<? (new t("Patient.Yearofbirth"))->tr()->p(); ?>
	<? (new t("Patient.Sex"))->tr()->p(); ?>
</table>