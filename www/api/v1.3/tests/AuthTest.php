<?php

require_once("RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends RouteReferenceTestCase {
	public function testsLogin() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("auth/mylogin")
                ->setMethod("POST")
                ->addParam("username", "murshed")
                ->addParam("password", "anything")
	        	->asUnauthenticated()
	    );

        $this->assertArrayHasKey('prices', $json);
        $this->assertEquals(3, count($json['prices']));
        // $this->assertArrayHasKey('price_lines', $json['prices'][1]);
        // $this->assertEquals(54, count($json['prices'][1]['price_lines']));
        // $this->assertArrayHasKey('price_lines', $json['prices'][1]);
        // $this->assertEquals("consult_CDC_consultation_Bengali_Doctor", $json['prices'][1]['price_lines'][0]['title']);
        // $this->assertEquals(200, $json['prices'][1]['price_lines'][0]['Amount']);

        $this->assertArrayHasKey('codes', $json);

        $this->assertArrayHasKey('lists', $json);
        $this->assertArrayHasKey('Examiner', $json['lists']);
        $this->assertContains('ershad', $json['lists']['Examiner']);
        $this->assertContains('murshed', $json['lists']['Examiner']);
	}
}
