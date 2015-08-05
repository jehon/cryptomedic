<?php 
	namespace App;
	require_once(__DIR__ . "/../../../rest/app/Bill.php");
	
	use \App\Bill;
	use \References;
	use \t;

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
				foreach(Bill::getFieldsList($cat, array_keys(t::cacheSqlStructureFor('bills'))) as $item) {
					(new t("Bill." . $item))->tr(str_replace("_", " ", substr($item, strpos($item, '_') + 1)))->p();		
				}
			}
		?>
	</tbody>
</table>
