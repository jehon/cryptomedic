<?php
// TODOJH: enable this
$response = new Response($request);

if (!$request->isServedLocally()) {
   throw new Exception("Only available locally");
}

// Check if a downloaded is old
$html_dir = __DIR__ . "/../tmp/templates-html/";
if (!is_dir($html_dir)) {
    mkdir($html_dir);
}

$js_dir = __DIR__ . "/../tmp/templates-js/";
if (!is_dir($html_dir)) {
    mkdir($html_dir);
}

foreach(MyFile::myglob(__DIR__ . "/../configs/templates/*.php") as $source) {
    $name = pathinfo($source, PATHINFO_FILENAME);
    $target = $html_dir . $name . ".html";

    if (!is_file($target) || (filemtime($target) < filemtime($source))) {
        ob_start();
        require_once($source);
        $res = ob_get_contents();
        ob_end_clean();
        file_put_contents($target, $res);
        // die("should upgrade $source");
    }

    // download
    // Check if a compiled is old
    // Run npm to compile
    // $v8 = new V8Js();
}

foreach(MyFile::myglob($html_dir . "/*.html") as $source) {
    $name = pathinfo($source, PATHINFO_FILENAME);
    $target = $js_dir . $name . ".html";
    if (!is_file($target) || (filemtime($target) < filemtime($source))) {
    }    
}