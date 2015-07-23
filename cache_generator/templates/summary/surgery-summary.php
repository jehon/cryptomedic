<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("Surgery.ReportDiagnostic"))->tr("Operation")->p(); ?>
		<?php (new t("Surgery.ReportSurgeon"))->tr("Operation")->p(); ?>
	</tbody>
</table>
