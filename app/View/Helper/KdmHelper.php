<?php

require_once dirname(__FILE__) . '/../Helper/PHPExcel/PHPExcel.php';

class KdmHelper extends AppHelper {
	// 	var $helpers = array('Html', 'Form', 'Session');
	var $reportCurrentRow = 0;
	
	function __construct($view) {
		parent::__construct($view);
		$this->request->data['filename'] = "export";
		$this->format = "";
		if (array_key_exists('_format', $_REQUEST) && ($_REQUEST['_format'] > ""))
			$this->format = $_REQUEST['_format'];
	}
	
	function getList($key, $allownull = false) {
		$model = substr($key, 0, strpos($key, '.'));
		$field = substr($key, strrpos($key, '.') + 1);

		if (!ClassRegistry::isKeySet($model)) {
			$omodel =& ClassRegistry::init($model);
		}

		$omodel =& ClassRegistry::getObject($model);
		if (get_class($omodel) != $model) {
			die("Class not found: $model - received " . get_class($omodel));
		}
		if (!isset($omodel::$part)) {
			die("No part associated with model $model");
		}

		if (!array_key_exists($field, $omodel::$part)) {
			die("No list associated with field $field on model $model");
		}

		$choix = $omodel::$part[$field];

		if (array_key_exists("labels", $choix) && $choix["labels"]) {
			unset($choix["labels"]);
			foreach($choix as $i => $v) {
				$nchoix[$v] = $this->getLabel($v);
			}
			$choix = $nchoix;
		} else {
			// TODO: not sure it works...
			unset($choix["labels"]);
			$choix = array_combine($choix, $choix);
		}

		if ($allownull) {
			$choix = array('' => $allownull) + $choix;
		}
		return $choix;
	}

	function getLabel($id) {
		if ($id == "") return "?";
		if (count(explode('.', $id)) > 2) {
			// remove the indice: model.i.field => model.field
			$id = preg_replace("/\.[^.]+\./", ".", $id);
		}

		$labels =& ClassRegistry::init('Label', true);
		if (is_numeric($id)) {
			$label = $labels->find('first', array('conditions' => array('Label.id' => $id)));
		} else {
			$label = $labels->find('first', array('conditions' => array('Label.reference' => $id)));
		}

		if (is_array($label)) {
			return $label['Label']['text'];
		}
		return $id;
	}

	function textualizeObject($object) {
		if (!array_key_exists('type', $object)) {
			pr($object);
			die("Object with no type");
		}
		$model = $object['type'];
		if (!ClassRegistry::isKeySet($model)) {
			$omodel =& ClassRegistry::init($model);
		}

		$omodel =& ClassRegistry::getObject($model);
		if (get_class($omodel) != $model) {
			die("Class not found: $model - received " . get_class($omodel));
		}
		if (!isset($omodel::$part)) {
			die("No part associated with model $model");
		}
		foreach($omodel::$part as $f => $l) {
			if (!array_key_exists('labels', $l)) continue;
			if (!$l['labels']) continue;
			if (!array_key_exists($f, $object)) {
				pr("missing: $f");
				continue;	
			}
			$object[$f] .= "/" . $this->getLabel($object[$f]);
		}
		return $object;
	}
	
	function reportFileName($file) {
		$this->request->data['filename'] = $file;
	}

	function reportBegin() {
		switch($this->format) {
			case 'csv':
			case 'csvfr':
				echo "\xEF\xBB\xBF";
				break;
			case 'xls':
				// Create new PHPExcel object
				$this->objPHPExcel = new PHPExcel();
				
				// Set document properties
				$this->objPHPExcel->getProperties()->setCreator("Cryptomedic online")
					->setTitle("Cryptomedic report")
					->setSubject("Test");
				$this->objPHPSheet = $this->objPHPExcel->setActiveSheetIndex(0);
				break;
			case 'html':
			default:
				?>
					Target file name: <?php echo $this->request->data['filename']; ?><br>
					Export in
						<a href='?<?php echo http_build_query($this->request->query)?>&_format=csv'>csv</a>,
						<a href='?<?php echo http_build_query($this->request->query)?>&_format=csvfr'>french-csv</a>,
						<a href='?<?php echo http_build_query($this->request->query)?>&_format=xls'>Excel</a>
					<table class='colorize' style='width: 200px'>
				<?php
		}
	}

	function reportEnd() {
		switch($this->format) {
			case 'csvfr':
			case 'csv':
				echo "** END **";
				break;
			case 'xls':
				$objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
				$objWriter->save('php://output');
				break;
			case 'html':
			default:
				echo "</table>";
		}
	}

	private function intToXLSCoordonates($col) {
		$n = $col;
		$baseArray = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	    $l = count($baseArray);
    	$s = '';
	    for ($i = 1; $n >= 0 && $i < 10; $i++) {
	        $s =  $baseArray[($n % pow($l, $i) / pow($l, $i - 1))].$s;
	        $n -= pow($l, $i);
	    }
	    return $s . $this->reportCurrentRow;
	}

	function reportHeader($title) {
		switch($this->format) {
			case 'csvfr':
			case 'csv':
				echo $title . "\n";
				break;
			case 'xls':
				$this->objPHPSheet->setCellValue($this->intToXLSCoordonates(0), $title);
				break;
			default:
				echo "<tr><td colspan=2 style='text-align: center'><h3>$title</h3></td></tr>\n";
		}
		$this->reportCurrentRow++;
	}

	function reportLine($args) {
		$this->reportCurrentColumn = 0;
		switch($this->format) {
			case 'csv':
			case 'csvfr':
				$this->reportCell(func_get_args());
				echo "\n";
				break;
			case 'xls':
				$this->reportCell(func_get_args());
				break;
			case 'html':
			default:
				echo "<tr>";
				$this->reportCell(func_get_args());
				echo "</tr>\n";
		}
		$this->reportCurrentRow++;
	}


	private function reportCell($arg) {
		if (is_array($arg)) {
			foreach($arg as $a) $this->reportCell($a);
		} else {
			switch($this->format) {
				case 'csv':
					echo str_replace(array("\\", "\n", ","), "#", $arg) . ",";
					break;
				case 'csvfr':
					if (is_numeric($arg)) {
						echo number_format($arg, 2, ',', '');
					} else {
						echo str_replace(array("\\", "\n", ";"), "#", $arg) . ";";
					}
					break;
				case 'xls':
					$this->objPHPSheet->setCellValue($this->intToXLSCoordonates($this->reportCurrentColumn++), $arg);
					break;
				case 'html':
				default:
					echo "<td>";
					if (is_float($arg)) {
						echo number_format($arg, 2, ".", " ");
					} else {
						echo $arg;
					}
					echo "</td>";
			}
		}
	}
}
