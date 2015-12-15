<?php

require_once("RouteReferenceTestCase.php");

class FolderTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("folder/1");
	}

	public function testsUnauthenticated() {
		$this->setUrl("folder/1");
		$this->myAssertUnauthorized();

		$this->setUrl("folder");
		$this->myAssertUnauthorized();
	}

	public function test1() {
		$this->setUrl("folder/1");
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	}

	public function testSearchAllowed() {
		$this->setUrl("folder?Name=md&entryyear=2009&pathology_Ricket=1&Telephone=1");
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

	public function testSearchName() {
		$this->setUrl("folder?Name=md");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'md') !== false, "Name " . $v->Name . " does not match criteria");
		}
	}

	public function testSearchNameWithJ() {
		$this->setUrl("folder?Name=j");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'j') !== false || stripos($v->Name, 'z') !== false, "Name " . $v->Name . " does not match criteria");
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
		$this->setUrl("folder?Pathology=Ricket");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals("Ricket", $v->Pathology);
		}
	}

	public function testSearchClubFoot() {
		$this->setUrl("folder?Pathology=ClubFoot");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals("ClubFoot", $v->Pathology);
		}
	}

	public function testSearchOther() {
		$this->setUrl("folder?Pathology=Other");
		$json = $this->myAssertJSON("readonly");
		foreach($json as $k => $v) {
			$this->assertEquals("Other", $v->Pathology);
		}
	}
}
