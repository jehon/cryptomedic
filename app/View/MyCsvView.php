<?php
App::uses('JsonView', 'View');
class MyCsvView extends JsonView {
	var $separator = ",";
	var $contentType = "application/csv";
	var $filename = "export";
	var $extension = "csv";

	public function __construct(Controller $controller = null) {
		parent::__construct($controller);
		$this->filename = $this->name;
		if (count($this->passedArgs) > 0)
			$this->filename .= "-" . $this->passedArgs[0];
		
		if (isset($_REQUEST['fr']))
			$this->separator = ";";
	}

	public function render($view = null, $layout = null) {
		$this->response->disableCache();
		if (!$this->request->query('inline')) {
			header('Content-Type: ' . $this->contentType);
			header('Content-Description: File Transfer');
			header('Content-Disposition: attachment; filename=' . $this->filename . '.' . $this->extension);
			
			// $this->response->body($string);
			// $this->response->type('ics');
			// $this->response->download('filename_for_download.ics');
			
			// // Return response object to prevent controller from trying to render a view
			// return $this->response;
		}
		return $this->header()
			. $this->renderArray($this->viewVars['data'])
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
