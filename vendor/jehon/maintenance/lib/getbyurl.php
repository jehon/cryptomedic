<?php
namespace Jehon\Maintenance\Lib;

require_once(__DIR__ . "/../../../autoload.php");

use \Exception;

/**
 * Get some info at some url
 *
 * @param $url
 * @return mixed: the result of the request
 * @throws Exception: in case Curl does not get the ressource, it throws an error
 */
function getByCurl($url, $post_data = null, $options = array()) {
	global $server;
	$ch = curl_init($url);

	// // Add mozilla (github need that?)
	// curl_setopt($ch, CURLOPT_HTTPHEADER, array(''));

	// Do not verify the peer
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// Do not verify the host
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

	// Return the result as "return" instead of anywhere
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Fail if authorization is required
	curl_setopt($ch, CURLOPT_FAILONERROR, true);

	/* Follow http redirection */
	curl_setopt($ch, CURLOPT_HEADER, true);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FORBID_REUSE, false);

	// 	if (getSession("github.token", false)) {
	// 		var_dump("github.token = " . getSession("github.token"));
	// 		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: token " . getSession("github.token")));
	// 	}

	if ($post_data) {
		curl_setopt($ch, CURLOPT_POST, count($post_data));
		$fields_string = "";
		foreach($post_data as $key => $value) {
			$fields_string .= $key . '=' . $value . '&';
		}
		trim($fields_string, '&');
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
	}

	foreach($options as $k => $v) {
		curl_setopt($ch, $k, $v);
	}

	$redirects = 5;
	do {
		$data = curl_exec($ch);
		if (curl_errno($ch)) {
			$msg = curl_error($ch);
			curl_close($ch);
			throw new Exception("Curl error for $url: " . $msg);
		}

		$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		if ($code != 301 && $code != 302) {
			break;
		}

		$header_start = strpos($data, "\r\n")+2;
		$headers = substr($data, $header_start, strpos($data, "\r\n\r\n", $header_start)+2-$header_start);
		if (!preg_match("!\r\n(?:Location|URI): *(.*?) *\r\n!", $headers, $matches)) {
			break;
		}

		curl_setopt($ch, CURLOPT_URL, $matches[1]);

		if (!$redirects) {
			throw new Exception('Too many redirects for ' . $url);
		}

		$redirects--;
	} while ($redirects);

	$data = substr($data, strpos($data, "\r\n\r\n")+4);

	if ($data === false) {
		$msg = curl_error($ch);
		curl_close($ch);
		throw new Exception('Curl with no data:' . $msg . " for '" . $url . "'");
	}

	curl_close($ch);
	return $data;
}

