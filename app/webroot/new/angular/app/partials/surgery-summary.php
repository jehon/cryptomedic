<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<tbody>
		<? (new t("Surgery.Operation"))->tr("Operation")->p(); ?>
	</tbody>
</table>
