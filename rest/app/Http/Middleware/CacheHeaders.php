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
    	// TODO: is it necessary to manage this here? all should be cached anyway...
    	$now = new \DateTime();
    	$response = $next($request);

    	$response->setLastModified(new DateTime("now"));
		$response->header("Expires", $this->cachingTime);
		$response->header("Cache-Control", ($this->cachingPublic ? "public" : "private") . " max-age=" . ($this->cachingTime - time()) );
					
    	return $response;
    }
}