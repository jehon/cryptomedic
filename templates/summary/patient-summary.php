<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table>
	<?php (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
	<?php (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
	<?php (new t("Patient.Firstname"))->tr()->p(); ?>
	<?php (new t("Patient.Lastname"))->tr()->p(); ?>
	<?php (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
	<?php (new t("Patient.Sex"))->tr("Sex")->p(); ?>
</table>