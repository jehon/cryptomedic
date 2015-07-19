<?php

require_once(__DIR__ . "/RouteReferenceTestCase.php");

class HomeTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("/home");
	}
	
	public function testUnauthenticated() {
		$this->myAssertUnauthorized();
	}
	
	public function testAuthenticated() {
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	}
}
