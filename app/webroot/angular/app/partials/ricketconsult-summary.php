<?php require_once(__DIR__ . "/../php/templates.php"); ?>
<table width="100%">
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<? (new t("RicketConsult.Rightleg"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.RightlegAngle"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.Leftleg"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.LeftlegAngle"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.Commentary"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.Heightcm"))->readOnly()->tr()->p(); ?>
		<? (new t("RicketConsult.Weightkg"))->readOnly()->tr()->p(); ?>
	</tbody>
</table>