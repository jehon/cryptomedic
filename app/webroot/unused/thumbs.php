<?
    
    // Constants
    $CACHE_DIR = ".thumbs";

    function diewith($msg) {
        header("HTTP/1.0 500 Internal error.");
        echo $msg;
        die;
    }

    // Get params
    $uri = $_REQUEST['uri'] or diewith("missing 'uri' argument.");
    $inWidth = $_REQUEST['w'];
    $inHeight = $_REQUEST['h'];
    $method=$_REQUEST['method'];
    
    // Handle client cache (304)
    $srcTime = filemtime($uri) or diewith("Unable to open 'uri'");
    $reqTimeStr = $_SERVER['HTTP_IF_MODIFIED_SINCE'];

    // Browser cache version not too old ?
    if ((! empty($reqTimeStr)) and ($srcTime <= strtotime($reqTimeStr))) {
        // End the request with status 304
        header("HTTP/1.1 304 Not modified");
        exit;
    } else {
        // Set the last change in HTTP reponse
        header("Last-Modified: " . date('r', $srcTime));
    }

    // Get actual size of source image
    $imgInfo = getimagesize($uri) or diewith("Unable to open '$uri'");
    $srcWidth =  $imgInfo[0];
    $srcHeight = $imgInfo[1];
    $srcType   = $imgInfo[2];
    switch($srcType) { 
        case 1 : $srcType = "gif"; break;
        case 2 : $srcType = "jpeg"; break;
        case 3 : $srcType = "png"; break;
        default: $srcType = "???";
    } 
    
    // Compute the size wanted 
    if ($method == "stretch") {
    
        // Exact size
        $outWidth  = $inWidth;
        $outHeight = $inHeight;
    
    } else { /* Default : 'fit' */
       
        // Max size : resize
        $xRatio = ($inWidth) ?  ($srcWidth  / $inWidth) : 0;
        $yRatio = ($inHeight) ? ($srcHeight / $inHeight): 0;
        $ratio = max($xRatio, $yRatio, 1);
        $outWidth = intval($srcWidth / $ratio);
        $outHeight = intval($srcHeight/ $ratio);
        
    }

    // Compute name of cache image
    $cacheName = md5($uri).'-'.basename($uri).'#'.$outWidth.'x'.$outHeight;
    $cacheFile = dirname(__FILE__) . '/'. $CACHE_DIR . '/' . $cacheName;
  
    // If cache doesn't exist or too old, build it.
    if (!file_exists($cacheName) or ($srcTime > $filectime($cacheFile))) {
        
        // Create output image
        $outImg = imagecreatetruecolor ($outWidth, $outHeight);
        
        // Load src image
        switch($srcType) {
            case "png":
                $srcImg = imagecreatefrompng($uri);
                break;
            case "gif":
                $srcImg = imagecreatefromgif($uri);
                break;
            case "jpeg":
                $srcImg = imagecreatefromjpeg($uri);
                break;
            default: 
                diewith("unsupported file type '$uri'");
        };

        // Resize image
        imagecopyresampled($outImg, $srcImg, 0, 0, 0, 0, $outWidth, $outHeight, $srcWidth, $srcHeight);
      
        // Save to cached thumb
        switch($srcType) {
            case "png":
                $res = imagepng($outImg, $cacheFile);
                break;
            case "gif":
                $res = imagegif($outImg, $cacheFile);
                break;
            case "jpeg":
                $res = imagejpeg($outImg, $cacheFile);
                break;
            default: 
                diewith("unsupported file type '$uri'");
        }

        // Check result 
        if (!$res) diewith("Unable to save thumb to '$cacheFile'. Check the access right of the HTTP server.");
    }

    // HTTP Header
    header("Content-Type:image/$srcType");
   
    // Dump cache file
    readfile($cacheFile) or diewith("Unable to open cached thumb '$cacheFile'");
?>
