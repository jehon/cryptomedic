<?php
  require_once(__DIR__ . "/../../t.php");

	t::setDefaultOption("baseExpression", "folder.getSubFile(\$index).");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("Surgery.ReportDiagnostic"))->tr("Operation")->p(); ?>
		<?php (new t("Surgery.ReportSurgeon"))->tr("Operation")->p(); ?>
	</tbody>
</table>
