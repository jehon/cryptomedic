<?php

require_once("RouteSecurityTestCase.php");

class HomeTest extends RouteReferenceTestCase {

	public function setUp() {
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
