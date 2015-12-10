<?php
	t::setDefaultOption("baseExpression", "folder.getMainFile().");
	t::setDefaultOption("readOnly");
?>
<table>
	<?php (new t("Patient.entryyear"))->tr("Entry Year")->p(); ?>
	<?php (new t("Patient.entryorder"))->tr("Entry Order")->p(); ?>
	<?php (new t("Patient.Name"))->tr()->p(); ?>
	<?php (new t("Patient.Yearofbirth"))->tr("Year of birth")->p(); ?>
	<?php (new t("Patient.Sex"))->tr("Sex")->p(); ?>
  <?php (new t("Patient.other_comments"))->tr("Comments")->p(); ?>
</table>
