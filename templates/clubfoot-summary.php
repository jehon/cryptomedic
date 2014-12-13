<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<?php (new t("ClubFoot.DIMEGLIO"))->tr()->p(); ?>
		<?php (new t("ClubFoot.Treatment"))->tr()->p(); ?>
	</tbody>
</table>
