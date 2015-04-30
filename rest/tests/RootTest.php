<?php

require_once("RouteSecurityTestCase.php");

class RootTest extends RouteReferenceTestCase {

	public function setUp() {
		parent::setUp("/");
	}
	
	public function testUnauthenticated() {
		$this->myAssertAuthorized();
	}
}
