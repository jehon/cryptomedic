<?php

use App\User;

class RouteReferenceTestCase extends TestCase {
	private $url = "";
	private $params = array();
	
	public function setUp($url = null, $params = array()) {
		parent::setUp();
 		$this->setUrl($url, $params);
	}

	protected function setUrl($url, $params = array()) {
		$this->url = $url;
		$this->params = $params;
	}

	protected function setParams($params = array()) {
		$this->params = $params;
	}
	
	protected function preAuthenticate($group = null) {
		if ($group === null) return;
		$user = new User(['name' => 'test', 'group' => $group ]);
		$this->be($user);
	}

	protected function myAssertUnauthorized($group = null) {
		$this->preAuthenticate($group);
		$response = $this->call('GET', $this->url, $this->params);
		$this->assertResponseStatus(302);
		return $response;
	}

	protected function myAssertAuthorized($group = null) {
		$this->preAuthenticate($group);
		$response = $this->call('GET', $this->url, $this->params);
		$this->assertResponseOk();
		return $response;
	}

	protected function myAssertJSON($group = null) {
		$response = $this->myAssertAuthorized($group);
		$json = json_decode($response->getContent());
		$this->assertNotNull($json, "Error parsing json");
		return $json;
	}
	
	protected function myAssertResponseForReference($group = null, $file = null) {
		/* Calculate the reference file */
		$response = $this->myAssertAuthorized($group);
		
		$st = debug_backtrace();
 		$stv = array_shift($st);
 		$stv = array_shift($st);
 		if ($file === null) {
 			// $stv['class']
 			$file = get_called_class()  . '.' . $stv['function'] . '.json';
 		}
 		$pfile = __DIR__  . "/references/" . $file;
 		
 		/* Assert or update the reference */
		if (getenv("COMMIT") > 0) {
		 	/* Read it and load $reference */
	 		if (file_exists($pfile)) {
	 			$reference = file_get_contents($pfile);
	 		} else {
	 			$reference = "";
	 		}
	 		
			/* Commit to the file */
	 		if (strcmp($reference, $response->getContent()) != 0) {
				file_put_contents($pfile, $response->getContent());
				echo "[$file updated]";
			}
		} else {
			/* Assert the difference */
			if (file_exists($pfile)) {
				$res = $this->assertStringEqualsFile($pfile, $response->getContent(), 
						"Result is invalid [$file - $pfile] >" . strlen($response->getContent() . 
								substr($response->getContent(), 0, 20) .
								(strlen($response->getContent() > 20 ? "..." : ""))));
			} else {
				$this->fail("Reference file not found: $file");
			}
		}
	}
}
