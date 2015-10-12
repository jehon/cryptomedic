<?php
namespace Jehon\Maintenance;

require_once(__DIR__ . "/lib/parameters.php");

use function Jehon\Maintenance\Lib\getConfig;
use function Jehon\Maintenance\Lib\getParameter;

class SessionProtect {
	protected $code;
	protected $source = "";
	protected $once = false;
	
	static public function run($code, $token = false) {
		$session = new SessionProtect($code, $token);
		$session->protect();
		$session->showHeader();
	}
	
	public function __construct($code, $token = false) {
		if (!$code) {
			throw new \Exception("No code given");
		}
		if (!$token) {
			$token = $code;
		}
		$this->code = $code;
		$this->token = $token;
		
		if (!isset($_SESSION)) {
			session_start();
		}
		
		if (!array_key_exists('maintenance_authorized', $_SESSION)) {
			$_SESSION['maintenance_authorized'] = false;
		}
		
		if (array_key_exists("maintenance_logout", $_REQUEST)) {
			$_SESSION['maintenance_authorized'] = false;
		}
		
		if (array_key_exists('maintenance_code', $_REQUEST)) {
			if ($code == $_REQUEST['maintenance_code']) {
				$_SESSION['maintenance_authorized'] = true;
				$this->source = "request";
			}
		}
		$byToken = false;
		if (array_key_exists('Token', apache_request_headers())) {
			if (apache_request_headers()['Token'] == $token) {
				$this->source = "token";
				$this->once = true;
			}
		}
	}
	
	public function protect() {
		if (!$_SESSION['maintenance_authorized'] && !$this->once) {
			http_response_code(403);
			?>
			    <form method="post" action="?">
			        <label for='maintenance_code'>Code:</label>
			        <input id='maintenance_code' name='maintenance_code'>
			        <input type='submit' value='Go'>
			    </form>
		    <?php
			die("Not authorized");
		}
	}
	
	public function showHeader() {
		echo "Authorization: " 
				. $this->source
				. " "
				. ($this->once ? "once" : "")
				. "<a href='?maintenance_logout=1'>Logout</a><br>"
				. "";
		echo "<hr>";
	}
}
