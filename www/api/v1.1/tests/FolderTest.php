<?php

require_once("SyncableTestCase.php");

class FolderTest extends SyncableTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("folder/1");
	}

	public function testsUnauthenticated() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder/1")
        	->asUnauthenticated()
          ->setExpected(401)
          ->asText()
      );

    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder/")
        	->asUnauthenticated()
          ->setExpected(401)
          ->asText()
      );
	}

	public function test1() {
    $opt = $this->getNewRequestOptionsBuilder()
      ->setUrl("folder/1");

    $json = $this->myRunAssertQuery(
    		$opt->clone()->setUser("readonly")
      );

    $json = $this->myRunAssertQuery(
    		$opt->clone()->setUser("cdc")
      );

    $json = $this->myRunAssertQuery(
    		$opt->clone()->setUser("manager")
      );

    $json = $this->myRunAssertQuery(
    		$opt->clone()->setUser("admin")
      );
	}

	public function testSearchAllowed() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=md&entryyear=2009&pathology_Ricket=1&Telephone=1")
      );
	}

	public function testSearchEntryYear() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?entryyear=2010")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(2010, $v->entryyear);
		}
	}

	public function testSearchEntryOrder() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?entryorder=10")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(10, $v->entryorder);
		}
	}

	public function testSearchName() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=md")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'md') !== false, "Name " . $v->Name . " does not match criteria");
		}
	}

	public function testSearchNameWithJ() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=j")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'j') !== false || stripos($v->Name, 'z') !== false, "Name " . $v->Name . " does not match criteria");
		}
	}

	public function testSearchSexBoy() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Sex=206")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(206, $v->Sex);
		}
	}

	public function testSearchSexGirl() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Sex=207")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(207, $v->Sex);
		}
	}

	public function testSearchYearofbirth() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Yearofbirth=2000")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(2000, $v->Yearofbirth);
		}
	}

	public function testSearchTelephone() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Telephone=2")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(strpos($v->Telephone, "2") !== false);
		}
	}

	public function testSearchRicket() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=Ricket")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Ricket", $v->Pathology);
		}
	}

	public function testSearchClubFoot() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=ClubFoot")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("ClubFoot", $v->Pathology);
		}
	}

	public function testSearchOther() {
    $json = $this->myRunAsserQueryWithoutOffline(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=Other")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Other", $v->Pathology);
		}
	}
}
