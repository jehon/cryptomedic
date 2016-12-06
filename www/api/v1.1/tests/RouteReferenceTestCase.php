<?php

use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

require_once("RequestOptionsBuilder.php");

class RouteReferenceTestCase extends TestCase {
	use DatabaseTransactions;

	const DAILY   = "day";
	const MONTHLY = "month";
	const YEARLY  = "year";

	private $url = "";
	private $params = array();

	protected static function absoluteUrl($relativeUrl) {
	  return "/api/" . basename(dirname(dirname(__FILE__))). "/" . $relativeUrl;
	}

	public function getNewRequestOptionsBuilder() {
		return new RequestOptionsBuilder();
	}

	public function myRunAssertQuery(RequestOptionsBuilder $opt = null) {
		if ($opt == null) {
			$opt = $this->getNewRequestOptionsBuilder();
		}
		if ($opt->getRole()) {
			$this->actingAs(new User(['name' => 'test', 'group' => $opt->getRole() ]));
		} else {
			// $this->be(null);
			$this->app['auth']->guard(null)->logout();
		}

		// See https://laravel.com/api/5.3/Illuminate/Foundation/Testing/TestCase.html#method_call
		// See https://github.com/laravel/framework/blob/5.3/src/Illuminate/Foundation/Testing/Concerns/MakesHttpRequests.php#L62
		$response = $this->call($opt->getMethod(), $opt->getAbsoluteUrl(), $opt->getParams(), [], [], $this->transformHeadersToServerVars($opt->getHeaders()));

		$this->assertResponseStatus($opt->getExpected());

		$text = $response->getContent();
		if ($response->getStatusCode() == 500) {
			echo $text;
		}

		if (!$opt->getAsJson()) {
			return $text;
		}

		$json = json_decode($text);
		$this->assertNotNull($json, "Received JSON is null. Problem parsing response?");

		if ($opt->getReference() !== false) {
			myAssertResponseAgainstReference($json, $opt->getReference());
		}

		return $json;
	}

	public function myRunAssertQueryForRoles($opt, $rolesList = [ "readonly", "cdc", "manager", "admin" ]) {
		$json = null;
		foreach($rolesList as $r) {
			$json = $this->myRunAssertQuery($opt->clone()->setRole($r));
		}
		return $json;
	}

	private function myAssertResponseAgainstReference($json, $file) {
		/* Calculate the reference file */
 		if ($file === null) {
			$st = debug_backtrace();
	 		$stv = array_shift($st);
	 		$stv = array_shift($st);
	 		$stv = array_shift($st);
 			// $stv['class']
 			$file = get_called_class()  . '.' . $stv['function'] . '.json';
 		} else {
 			$file = $file . ".json";
 		}
 		$pfile = __DIR__  . "/references/" . $file;

	 	if (property_exists($json, "_offline")) {
		 	unset($json->_offline);
	 	}

	 	$jsonPP = json_encode($json, JSON_PRETTY_PRINT);

 		/* Assert or update the reference */
		if (getenv("COMMIT") > 0) {
		 	/* Read it and load $reference */
	 		if (file_exists($pfile)) {
	 			$reference = file_get_contents($pfile);
	 		} else {
	 			$reference = "";
	 		}

			/* Commit to the file */
	 		if (strcmp($reference, $jsonPP) != 0) {
				file_put_contents($pfile, $jsonPP);
				echo "[$file updated]";
			}
		} else {
			/* Assert the difference */
			if (file_exists($pfile)) {
				$res = $this->assertStringEqualsFile($pfile, $jsonPP);
			} else {
				$this->fail("Reference file not found: $file");
			}
		}
		return $json;
	}


	/* Obsolete */

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

	 	$json_obj = (object) json_decode($response->getContent());

	 	if (property_exists($json_obj, "_offline")) {
		 	unset($json_obj->_offline);
	 	}

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
