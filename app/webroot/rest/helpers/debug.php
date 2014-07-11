<?php

function trace() {
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
	var_dump($list);
	echo "<script>console.log(JSON.parse('" . json_encode($list) . "')); </script>";
}
