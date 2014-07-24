<?php

function trace($comments = "") {
	$trace = debug_backtrace();
	array_shift($trace);
	$list = array();
	if (count(func_get_args()) > 0) {
		$str = "";
		$str .= "Trace with ";
		$str .= implode(func_get_args(), ",");
		$list[] = str_replace([ "\"", "'", "\\" ], "_", $str);
	}
	foreach($trace as $i => $t) {
		$str = "";
		$str .= basename($t['file']) . ":" . $t['line'] 
			. (array_key_exists('function', $t) ? 
				"@" . (array_key_exists('class', $t) ? $t['class'] . "->" : "")
				. $t['function'] : "");
		if (array_key_exists('args', $t) && !in_array($t['function'], [ "require_once", "require", "include_once", "inluce" ])) {
			$str .= "[";
			foreach($t['args'] as $i => $v)  {
				if ($i != 0) $str .= ",";
				$str .= is_array($v) ? "Array" : $v;
			}
			$str .= "]";
		}
		$list[] = str_replace([ "\"", "'", "\\" ], "_", $str);
	}
	foreach($list as $i => $l) {
		debugHeader($l, "TRACE-$i");
		echo "$i: $l <br>\n";
	}
}

/**
 * Add a debug header to the request (only if in debug mode)
 * 
 * The header is in the form "$topic: $content"
 * 
 * @param $topic: the title of the debug header
 * @param $content: value sent to the browser
 */
function debugHeader($content, $topic = "ERROR") {
	if (!headers_sent() && (!isset($server) || $server->getConfig('debug', false))) {
		header("X-SERVER-" . $topic . ': ' . $content, false);
	}
}
