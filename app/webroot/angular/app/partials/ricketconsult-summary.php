<?php 
	require_once(__DIR__ . "/../php/templates.php"); 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("RicketConsult.Rightleg"))->tr()->p(); ?>
		<? (new t("RicketConsult.RightlegAngle"))->tr()->p(); ?>
		<? (new t("RicketConsult.Leftleg"))->tr()->p(); ?>
		<? (new t("RicketConsult.LeftlegAngle"))->tr()->p(); ?>
		<? (new t("RicketConsult.Commentary"))->tr()->p(); ?>
		<? (new t("RicketConsult.Heightcm"))->tr()->p(); ?>
		<? (new t("RicketConsult.Weightkg"))->tr()->p(); ?>
	</tbody>
</table>