<?php

class FolderTest extends RouteReferenceTestCase {

	public function testsUnauthenticated() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder/Patient/1")
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
      ->withReference()
      ->setUrl("folder/Patient/1");
    $json = $this->myRunAssertQueryForRoles($opt);
    $this->assertEquals(1, $json->id);
	}

  public function test6() {
    $opt = $this->getNewRequestOptionsBuilder()
      ->withReference()
      ->setUrl("folder/Patient/6");
    $json = $this->myRunAssertQueryForRoles($opt);
    $this->assertEquals(6, $json->id);
  }

	public function testSearchAllowed() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=md&entryyear=2009&pathology_Ricket=1&Telephone=1")
      );
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder")
          ->setParams([
              "Name" => "md",
              "entryyear" => 2009,
              "pathology_Ricket" => 1,
              "Telephone" => 1
            ])
      );
	}

	public function testSearchEntryYear() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?entryyear=2010")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(2010, $v->entryyear);
		}
	}

	public function testSearchEntryOrder() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?entryorder=10")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(10, $v->entryorder);
		}
	}

	public function testSearchName() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=md")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'md') !== false, "Name " . $v->Name . " does not match criteria");
		}
	}

	public function testSearchNameWithJ() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Name=j")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v->Name, 'j') !== false || stripos($v->Name, 'z') !== false, "Name " . $v->Name . " does not match criteria");
		}
	}

	public function testSearchSexBoy() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Sex=206")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(206, $v->Sex);
		}
	}

	public function testSearchSexGirl() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Sex=207")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(207, $v->Sex);
		}
	}

	public function testSearchYearofbirth() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Yearofbirth=2000")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(2000, $v->Yearofbirth);
		}
	}

	public function testSearchTelephone() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Telephone=2")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(strpos($v->Telephone, "2") !== false);
		}
	}

	public function testSearchRicket() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=Ricket")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Ricket", $v->Pathology);
		}
	}

	public function testSearchClubFoot() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=ClubFoot")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("ClubFoot", $v->Pathology);
		}
	}

	public function testSearchOther() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?Pathology=Other")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Other", $v->Pathology);
		}
	}
}
