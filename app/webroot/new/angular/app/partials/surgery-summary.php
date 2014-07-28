<?php 
	require_once(dirname(dirname(dirname(__DIR__))) . "/libs/php/templates.php");
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("Surgery.Operation"))->tr()->p(); ?>
	</tbody>
</table>
