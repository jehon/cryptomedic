<?php 
	t::setDefaultOption("baseExpression", "currentFile().");
	t::setDefaultOption("readOnly");
?>
<table style='width: 100%'>
	<colgroup span="2" width="50%"></colgroup>
	<tbody>
		<?php (new t("Bill.Sociallevel"))->tr("Social Level")->p(); ?>
		<?php (new t("Bill.total_asked"))->tr("Total asked")->p(); ?>
		<?php (new t("Bill.total_paid"))->tr("Total paid")->p(); ?>
		<?php 
			foreach(Bill::$categories as $cat) {
				foreach(Bill::getFielsList($cat) as $item) {
					(new t("Bill." . $item))->tr(str_replace("_", " ", substr($item, strpos($item, '_') + 1)))->p();		
				}
			}
		?>
	</tbody>
</table>
