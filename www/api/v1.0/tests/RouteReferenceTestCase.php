<?php

use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RouteReferenceTestCase extends TestCase {
	use DatabaseTransactions;

	const DAILY   = "day";
	const MONTHLY = "month";
	const YEARLY  = "year";

	private $url = "";
	private $params = array();

	public static function absoluteUrl($relativeUrl) {
		return "/api/" . basename(dirname(dirname(__FILE__))). "/" . $relativeUrl;
	}

	public function setUp($url = null, $params = array()) {
		parent::setUp();
 		$this->setUrl($url, $params);
	}

	protected function setUrl($url, $baseParams = array()) {
		$this->url = self::absoluteUrl($url);
		$this->baseParams = $baseParams;
	}

	protected function setParams($params = array()) {
		$this->params = $params;
	}

	protected function preAuthenticate($group = null) {
		if ($group === null) return;
		$user = new User(['name' => 'test', 'group' => $group ]);
		$this->actingAs($user);
	}

	protected function myAssertUnauthorized($group = null) {
		$this->preAuthenticate($group);
		$response = $this->call('GET', $this->url, $this->baseParams + $this->params);
		if ($response->getStatusCode() == 500) {
			echo $response->getContent();
		}
		// Ajax unauthorized is 401, http unauthorized is 302
		$this->assertResponseStatus(401);
		return $response;
	}

	protected function myAssertAuthorized($group = null) {
		$this->preAuthenticate($group);
		$response = $this->call('GET', $this->url, $this->baseParams + $this->params);
		if ($response->getStatusCode() == 500) {
			echo $response->getContent();
		}
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

 		if ($file === null) {
			$st = debug_backtrace();
	 		$stv = array_shift($st);
	 		$stv = array_shift($st);
 			// $stv['class']
 			$file = get_called_class()  . '.' . $stv['function'] . '.json';
 		} else {
 			$file = $file . ".json";
 		}
 		$pfile = __DIR__  . "/references/" . $file;

	 	$json_obj = json_decode($response->getContent());
	 	$json = json_encode($json_obj, JSON_PRETTY_PRINT);

 		/* Assert or update the reference */
		if (getenv("COMMIT") > 0) {
		 	/* Read it and load $reference */
	 		if (file_exists($pfile)) {
	 			$reference = file_get_contents($pfile);
	 		} else {
	 			$reference = "";
	 		}

			/* Commit to the file */
	 		if (strcmp($reference, $json) != 0) {
				file_put_contents($pfile, $json);
				echo "[$file updated]";
			}
		} else {
			/* Assert the difference */
			if (file_exists($pfile)) {
				$res = $this->assertStringEqualsFile($pfile, $json);
			} else {
				$this->fail("Reference file not found: $file");
			}
		}
		return $json_obj;
	}
}
