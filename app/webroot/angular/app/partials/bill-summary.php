<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("Bill.socialLevel"))->tr()->p(); ?>
		<? (new t("Bill.total_asked"))->tr()->p(); ?>
		<? (new t("Bill.total_paid"))->tr()->p(); ?>
	</tbody>
</table>
