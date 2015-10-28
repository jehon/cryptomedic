<?php
namespace Jehon\Maintenance;

class Debug {

	static public function run() {
		if (!isset($_SESSION)) {
			session_start();
		}
		header("Content-Type: text/html; charset=utf-8");
		?>
			<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
			<html>
			<body>
		<?php
	    if (array_key_exists("delete", $_REQUEST)) {
	        echo "<div style='background-color: yellow'>Removing session key " . $_REQUEST["delete"] . "</div>";
	        unset($_SESSION[$_REQUEST["delete"]]);
	        echo "<br>";
	    }
		?>
			<a href="/server-status">Server status</a><br>

			<h1>Request</h1>
			<h3>$_REQUEST</h3>
			<pre><?php var_dump($_REQUEST); ?></pre>

			<h3>apache_request_headers</h3>
			<pre><?php
			    if (function_exists("apache_request_headers")) {
			        var_dump(apache_request_headers());
			    } else {
			        echo "function not found";
			    }
			?></pre>

			<h3>http_get_request_headers</h3>
			<pre><?php
			    if (function_exists("http_get_request_headers")) {
			        var_dump(http_get_request_headers());
			    } else {
			        echo "function not found";
			    }
			?></pre>

			<h3>getallheaders</h3>
			<pre><?php
			    if (function_exists("getallheaders")) {
			        var_dump(getallheaders());
			    } else {
			        echo "function not found";
			    }
			?></pre>

			<h1>Statefull</h1>
			<h3>Session</h3>
			Unset: <?php
			    foreach($_SESSION as $key => $value) {
			        echo "<a href='?delete=$key'>$key</a> ";
			    }
			?>
			<pre><?php
			    if (isset($_SESSION)) {
			        print_r($_SESSION);
			    } else {
			        echo "no session started";
			    }
			?></pre>

			<h3>Server</h3>
			<pre><?php print_r($_SERVER); ?></pre>

			<h3>Env</h3>
			<pre><?php print_r($_ENV); ?></pre>

			<h1>PhpInfo</h1>
			<?php phpinfo(); ?>

			</body>
			</html>
		<?php
	}
}
