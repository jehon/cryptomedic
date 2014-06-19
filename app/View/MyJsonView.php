<?php

App::uses('JsonView', 'View');

class MyJsonView extends JsonView {
	public function __construct(Controller $controller = null) {
		parent::__construct($controller);
		$this->viewVars['_serialize'] = "data";
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
		$mycache_seconds = 3600 * 24 * 365;
		
		if ((array_key_exists("cached", $this->viewVars) && $this->viewVars["cached"]) 
			|| array_key_exists("cached", $_REQUEST)
			|| ($this->request->query('version'))) {

			$this->response->cache(0, '+365days');
			$this->response->sharable(true, $mycache_seconds);
		} else {
			$this->response->disableCache();
		}
		
		$res = "";
		if ($this->request->query('var')) {
			$this->response->type('javascript');
			$res .= $this->request->query('var') . "=";
		} else {
			$this->response->type('json');
		}
		
		if (!array_key_exists("data", $this->viewVars))
			$this->viewVars['data'] = "<No \$data>";
		
		if (is_array($this->viewVars['data']) && array_key_exists("flattern", $this->viewVars) && $this->viewVars['flattern']) {
			$field = $this->viewVars['flattern'];
			$ajax = array();
			foreach($this->viewVars['data'] as $i => $m) {
				if (is_array($m)) {
					foreach($m as $j => $d) {
						if (is_array($d) && array_key_exists($field, $d)) {
							$ajax[$d[$field]] = $d;
						} else {
							$ajax[$j] = $d;
						}
					}
				} else {
					$ajax[$i] = $m;
				}
			}
			$this->viewVars['data'] = $ajax;		
		}
		$this->viewVars['data'] = $this->changeDates($this->viewVars['data']);
		$res .= parent::render($view, $layout);
		
		return $res;
	}
	
	private function changeDates($data) {
		if (is_array($data)) {
			foreach($data as $key => $val) {
				if (is_array($val))
					$data[$key] = $this->changeDates($val);
			}
			foreach([ "modified", "created" ] as $key) {
				if (array_key_exists($key, $data) && !is_array($data[$key]))
					$data[$key] = $data[$key] . " GMT" . date("O");
			}
		}
		return $data;		
	}
}
