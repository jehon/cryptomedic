<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use App\User;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;
use DateTime;

class CacheHeaders {
	var $cachingTime = 3600;
	var $cachingPublic = false;
	
	protected function safeHeader($what) {
		if (!headers_sent()) { 
			header($what);
		}
	}
	
	/**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    	// TODOJH: manage caching
    	$now = new \DateTime();
    	$response = $next($request);
    	
// 		$response->header("Date", gmdate("D, j M Y G:i:s ", time()) . 'GMT');
// 		$response->setDate($now);
// 		$response->header("Last-Modified", gmdate("D, d M Y H:i:s") . " GMT");
    	$response->setLastModified(new DateTime("now"));
				
		if ($request->input("_version", false)) {
    		$response->setExpires(new DateTime("tomorrow"));
// 			$response->setMaxAge($this->cachingTime);
//     		$response->setPrivate();
//     		$response->expire($now);
// 			$response->header("Pragma", "cache");
			$response->header("Expires", $this->cachingTime);
			$response->header("Cache-Control", ($this->cachingPublic ? "public" : "private") . " max-age=" . ($this->cachingTime - time()) );
// 		} else {
// 			$response->header("Pragma", "no-cache");
// 			$response->header("Expires", "Mon, 26 Jul 1997 05:00:00 GMT");
// 			$response->header("Cache-Control", "no-cache");
		}
					
    	return $response;
    }
}