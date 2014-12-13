<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<?php (new t("Bill.socialLevel"))->tr("Social Level")->p(); ?>
		<?php (new t("Bill.total_asked"))->tr("Total asked")->p(); ?>
		<?php (new t("Bill.total_paid"))->tr("Total paid")->p(); ?>
	</tbody>
</table>
