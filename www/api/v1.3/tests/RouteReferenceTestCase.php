<?php

use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

require_once("RequestOptionsBuilder.php");

class RouteReferenceTestCase extends TestCase {
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
		if ($opt->getRole() !== false) {
			$user = new User(['name' => 'test', 'group' => $opt->getRole() ]);
			$this->actingAs($user);
		} else {
			// $this->be(null);
			$this->app['auth']->guard(null)->logout();
		}

		// See https://laravel.com/api/5.3/Illuminate/Foundation/Testing/TestCase.html#method_call
		// See https://github.com/laravel/framework/blob/5.3/src/Illuminate/Foundation/Testing/Concerns/MakesHttpRequests.php#L62
		$response = $this->call($opt->getMethod(), $opt->getAbsoluteUrl(), $opt->getParams(), [], [], $this->transformHeadersToServerVars($opt->getHeaders()));


		$text = $response->getContent();
		if ($response->getStatusCode() == 500) {
			echo $text;
		}

		$response->assertStatus($opt->getExpected());

		if (!$opt->getAsJson()) {
			return $text;
		}

		$json = json_decode($text);
		$this->assertNotNull($json, "Received JSON is null. Problem parsing response?");

		if ($opt->getReference() !== false) {
			$this->myAssertResponseAgainstReference($json, $opt->getReference());
		}

		return $json;
	}

	public function myRunAssertQueryForRoles($opt, $rolesList = [ "readonly", "cdc", "manager", "admin" ], $asUnauthenticated = true) {
		$json = null;

		if ($asUnauthenticated) {
			$this->myRunAssertQuery($opt->clone()
					->asUnauthenticated()
					->setExpected(401)
					->asText()
					);
		}

		foreach($rolesList as $r) {
			$json = $this->myRunAssertQuery($opt->clone()->setRole($r));
		}
		return $json;
	}

	protected function myAssertResponseAgainstReference($json, $file = null) {

		$jsonFiltered = json_decode(
			preg_replace(
				'/"(created_at|updated_at)":"[0-9\- :]+"/',
				'"$1":"<timestamp>"',
				json_encode($json))
			);

	 	$jsonPP = json_encode($jsonFiltered, JSON_PRETTY_PRINT);

		/* Calculate the reference file */
 		if ($file === null) {
			$st = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
			while($sti = array_shift($st)) {
				if ($sti['file'] == __FILE__) {
					continue;
				}
				if (basename($sti['file']) == 'FicheTestHelper.php') {
					continue;
				}
				break;
			}
			$sti = array_shift($st); // Go to the previous call, where we have the class.method that is interresting for us
 			$file = get_called_class() . '.' . $sti['function'] . '.json';
 		} else {
 			$file = $file . ".json";
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
}
