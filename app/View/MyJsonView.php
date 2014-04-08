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
			|| ($this->request->query('version'))) {
			header("Expires: " . gmdate("D, d M Y H:i:s", time() + $mycache_seconds) . " GMT");
			header("Pragma: cache");
			header("Cache-Control: max-age=$mycache_seconds");
		} else {
			header("Pragma: no-cache");
			header("Cache-Control: no-store, no-cache, max-age=0, must-revalidate");
		}
		
		$res = "";
		if ($_REQUEST['var']) {
			$this->response->type('javascript');
			$res .= $_REQUEST['var'] . "=";
		} else {
			$this->response->type('json');
		}
		
		if (is_array($this->viewVars['data']) && array_key_exists("flattern", $this->viewVars) && $this->viewVars['flattern']) {
			$ajax = array();
			foreach($this->viewVars['data'] as $i => $m) {
				if (is_array($m)) {
					foreach($m as $j => $d) {
						if (is_array($d) && array_key_exists('id', $d)) {
							$ajax[$d['id']] = $d;
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
		
		$res .= parent::render($view, $layout);
		
		return $res;
	}
}
