<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("OrthopedicDevice.id"))->readOnly()->tr()->p(); ?>
	</tbody>
</table>
