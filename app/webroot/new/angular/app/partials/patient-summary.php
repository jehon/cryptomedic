<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table>
	<? (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
	<? (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
	<? (new t("Patient.Firstname"))->tr()->p(); ?>
	<? (new t("Patient.Lastname"))->tr()->p(); ?>
	<? (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
	<? (new t("Patient.Sex"))->tr("Sex")->p(); ?>
</table>