<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<tbody>
		<?php (new t("Surgery.Operation"))->tr("Operation")->p(); ?>
	</tbody>
</table>
