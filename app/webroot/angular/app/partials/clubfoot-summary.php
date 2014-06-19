<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("ClubFoot.DIMEGLIO"))->readOnly()->tr()->p(); ?>
		<? (new t("ClubFoot.Treatment"))->readOnly()->tr()->p(); ?>
	</tbody>
</table>
