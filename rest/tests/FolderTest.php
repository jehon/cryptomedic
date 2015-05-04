<?php

require_once("RouteSecurityTestCase.php");

class FoldersTest extends RouteReferenceTestCase {

	public function setUp() {
		parent::setUp("folder/10001");
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
