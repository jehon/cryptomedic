<?php

require_once(__DIR__ . "/RouteReferenceTestCase.php");

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
		$this->assertEquals(1, $json['id']);
	}

  public function test6() {
    $opt = $this->getNewRequestOptionsBuilder()
      ->withReference()
      ->setUrl("folder/Patient/6");
    $json = $this->myRunAssertQueryForRoles($opt);
    $this->assertEquals(6, $json['id']);
  }

	public function testSearchAllowed() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?name=md&entry_year=2009&pathology_Ricket=1&phone=1")
      );
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder")
          ->setParams([
              "name" => "md",
              "entry_year" => 2009,
              "pathology_Ricket" => 1,
              "phone" => 1
            ])
      );
	}

	public function testSearchEntryYear() {
		$json = $this->myRunAssertQuery(
			$this->getNewRequestOptionsBuilder()
				->setUrl("folder?entry_year=2010")
			);
		foreach($json as $k => $v) {
			$this->assertEquals(2010, $v['entry_year']);
		}
	}

	public function testSearchEntryOrder() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?entry_order=10")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(10, $v['entry_order']);
		}
	}

	public function testSearchName() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?name=md")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v['name'], 'md') !== false, "name " . $v['name'] . " does not match criteria");
		}
	}

	public function testSearchNameWithJ() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?name=j")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(stripos($v['name'], 'j') !== false || stripos($v['name'], 'z') !== false, "name " . $v['name'] . " does not match criteria");
		}
	}

	public function testSearchSexBoy() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?sex=206")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(206, $v['sex']);
		}
	}

	public function testSearchSexGirl() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?sex=207")
      );

		foreach($json as $k => $v) {
			$this->assertEquals(207, $v['sex']);
		}
	}

	public function testSearchYearofbirth() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?year_of_birth=2000")
      );
		foreach($json as $k => $v) {
			$this->assertEquals(2000, $v['year_of_birth']);
		}
	}

	public function testSearchphone() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?phone=2")
      );
		foreach($json as $k => $v) {
			$this->assertTrue(strpos($v['phone'], "2") !== false);
		}
	}

	public function testSearchRicket() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?pathology=Ricket")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Ricket", $v['pathology']);
		}
	}

	public function testSearchClubFoot() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?pathology=ClubFoot")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("ClubFoot", $v['pathology']);
		}
	}

	public function testSearchOther() {
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("folder?pathology=Other")
      );
		foreach($json as $k => $v) {
			$this->assertEquals("Other", $v['pathology']);
		}
	}
}
