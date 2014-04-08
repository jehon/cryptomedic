<?php

App::uses('JsonView', 'View');

// TODO: change the links!

class MyCsvView extends JsonView {
	var $separator = ",";
	var $contentType = "application/csv";
	var $filename = "export";
	var $extension = "csv";
	
	public function __construct(Controller $controller = null) {
		parent::__construct($controller);
		$this->filename = $this->name . "-" . $this->passedArgs[0];
		if (isset($_REQUEST['fr'])) 
			$this->separator = ";";
	}
	
	/**
	 * Render a JSON view.
	 *
	 * Uses the special '_serialize' parameter to convert a set of
	 * view variables into a JSON response. Makes generating simple
	 * JSON responses very easy. You can omit the '_serialize' parameter,
	 * and use a normal view + layout as well.
	 *
	 * @param string $view The view being rendered.
	 * @param string $layout The layout being rendered.
	 * @return string The rendered view.
	 */
	public function render($view = null, $layout = null) {
		//$this->autoRender = false; // no view to render
		header("Pragma: no-cache");
		header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");
		if (!isset($_REQUEST['inline'])) {
			header('Content-Type: ' . $this->contentType);
			header('Content-Description: File Transfer');

			// TODO: define and fix filename
			header('Content-Disposition: attachment; filename=' . $this->filename . '.' . $this->extension);
		} 		
		return $this->header() 
			. $this->renderArray($this->data)
			. $this->footer();
	}
	
	
	var	$previousKeys = array();		
	private function renderArray($data, $model = "") {
		if (!is_array($data)) {
			pr("Data is not an array");
			pr($data);
			return "";
		}
		$res = "";

		$allArrays = true;
		foreach($data as $k => $v) {
			$allArrays = $allArrays && is_array($v);
		}
		if (!$allArrays) {
			if (array_keys($data) != $this->previousKeys) {
				$this->previousKeys = array_keys($data);
				foreach($this->previousKeys as $v) {
					$res .= $this->addCell($v);
				}
				$res .= $this->endOfLine();
			}
			foreach($data as $k => $v) {
				if (is_array($v)) {
					$res .= $this->addCell("[$k]");
				} else {
					$res .= $this->addCell(cryptomedicValue2label($model, $k, $v));
				}
			}
			$res .= $this->endOfLine();
		}	
			
		foreach($data as $k => $v) {
			if (is_array($v)) {
				if (!is_numeric($k))
					$res .= $this->addCell("*** " . $k) . $this->endOfLine();
				if (is_numeric($k))
					$res .= $this->renderArray($v, $model);
				else
					$res .= $this->renderArray($v, $k);
			}
		}
		
		return $res;
	}

	protected function header() {
		return "\xEF\xBB\xBF";
	}
	
	protected function addCell($data) {
		return str_replace(array("\\", "\n", ","), "#", $data) . $this->separator;
	}

	protected function endOfLine() {
		return "\n";
	}
	
	protected function footer() {
		return "** END **";
	}
	
}
