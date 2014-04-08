<?php

require_once("MyCsvView.php");
require_once dirname(__FILE__) . '/../Lib/PHPExcel/PHPExcel.php';


class MyExcelView extends MyCsvView {
	var $contentType = "application/xls";
	var $filename = "export";
	var $extension = "xls";
	
	
	var $row = 0;
	var $col = 0;
	
	protected function header() {
		// Create new PHPExcel object
		$this->objPHPExcel = new PHPExcel();
		
		// Set document properties
		$this->objPHPExcel->getProperties()->setCreator("Cryptomedic online")
			->setTitle("Cryptomedic report")
			->setSubject("Test");
		$this->objPHPSheet = $this->objPHPExcel->setActiveSheetIndex(0);
		return "";
	}
	
	protected function addCell($data) {
	    $this->objPHPSheet->setCellValue($this->intToXLSCoordonates($this->row, $this->col), $data);
		$this->col++;
	}
	
	protected function endOfLine() {
		$this->col = 0;
		$this->row++;
	}
	
	protected function footer() {
		$objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
		$objWriter->save('php://output');
	}
	
	private function intToXLSCoordonates($row, $col) {
		$n = $col;
		$baseArray = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	    $l = count($baseArray);
    	$s = '';
	    for ($i = 1; $n >= 0 && $i < 10; $i++) {
	        $s =  $baseArray[($n % pow($l, $i) / pow($l, $i - 1))].$s;
	        $n -= pow($l, $i);
	    }
	    return $s . $row;
	}
}
