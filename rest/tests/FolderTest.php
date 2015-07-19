<?php

require_once("RouteReferenceTestCase.php");

class FolderTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("folder/10001");
	}
	
	public function testsUnauthenticated() {
		$this->setUrl("folder/10001");
		$this->myAssertUnauthorized();

		$this->setUrl("folder");
		$this->myAssertUnauthorized();
	}

	public function test10001() {
		$this->setUrl("folder/10001");
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	}

	public function testSearchAllowed() {
		$this->setUrl("folder?Lastname=md&entryyear=2009&pathology_Ricket=1&Telephone=1");
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	}
	
	public function testSearchEntryYear() {
		$this->setUrl("folder?entryyear=2010");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(2010, $v->entryyear);
		}
	}
	
	public function testSearchEntryOrder() {
		$this->setUrl("folder?entryorder=10");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(10, $v->entryorder);
		}
	}
	
	public function testSearchLastName() {
		$this->setUrl("folder?Lastname=md");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertTrue((stripos($v->Lastname, 'md') !== false) || (stripos($v->Firstname, 'md') !== false), 
					"Name " . $v->Lastname . " - " . $v->Firstname . " does not match criteria");
		}
	}
	
	public function testSearchLastNameWithJ() {
		$this->setUrl("folder?Lastname=j");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertTrue((stripos($v->Lastname, 'z') !== false) || (stripos($v->Firstname, 'z') !== false),
					"Name " . $v->Lastname . " - " . $v->Firstname . " does not match criteria");
		}
	}
	
	public function testSearchSexBoy() {
		$this->setUrl("folder?Sex=206");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(206, $v->Sex);
		}
	}
	
	public function testSearchSexGirl() {
		$this->setUrl("folder?Sex=207");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(207, $v->Sex);
		}
	}
	
	public function testSearchYearofbirth() {
		$this->setUrl("folder?Yearofbirth=2000");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(2000, $v->Yearofbirth);
		}
	}
	
	public function testSearchTelephone() {
		$this->setUrl("folder?Telephone=2");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertTrue(strpos($v->Telephone, "2") !== false);
		}
	}
	
	public function testSearchRicket() {
		$this->setUrl("folder?pathology_Ricket=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Ricket);
		}
	}
	
	public function testSearchClubFoot() {
		$this->setUrl("folder?pathology_Clubfoot=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Clubfoot);
		}
	}

	public function testSearchBurn() {
		$this->setUrl("folder?pathology_Burn=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Burn);
		}
	}

	public function testSearchPolio() {
		$this->setUrl("folder?pathology_Polio=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Polio);
		}
	}

	public function testSearchCP() {
		$this->setUrl("folder?pathology_CP=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_CP);
		}
	}
	
	public function testSearchCongenital() {
		$this->setUrl("folder?pathology_Congenital=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Congenital);
		}
	}
	
	public function testSearchAdult() {
		$this->setUrl("folder?pathology_Adult=1");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals(1, $v->pathology_Adult);
		}
	}
}
