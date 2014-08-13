<?php 
	require_once(__DIR__ . "/../../../../../../../rest/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<tbody>
		<? (new t("Surgery.Operation"))->tr("Operation")->p(); ?>
	</tbody>
</table>
