<?php

require_once("RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends RouteReferenceTestCase {
	public function testsLogin() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("auth/mylogin")
                ->setMethod("POST")
                ->addParam("login", "murshed")
                ->addParam("password", "anything")
	        	->asUnauthenticated()
	    );
        echo json_encode($json['prices'], JSON_PRETTY_PRINT);

        $this->assertArrayHasKey('prices', $json);
        $this->assertEquals(3, count($json['prices']));
        $this->assertArrayHasKey('price_lines', $json['prices'][1]);
        $this->assertEquals(54, count($json['prices'][1]['price_lines']));
        $this->assertArrayHasKey('price_lines', $json['prices'][1]);
        $this->assertEquals("consult_CDC_consultation_Bengali_Doctor", $json['prices'][1]['price_lines'][0]['title']);
        $this->assertEquals(200, $json['prices'][1]['price_lines'][0]['Amount']);
	}
}
