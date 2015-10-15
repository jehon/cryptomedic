<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use App\User;

class PHPRestBinding {
	/**
	 * The Guard implementation.
	 *
	 * @var Guard
	 */
	protected $auth;

	/**
	 * Create a new filter instance.
	 *
	 * @param  Guard  $auth
	 * @return void
	 */
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
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
		if (!headers_sent()) {
	    	session_start();
		}
		if (isset($_SESSION) && is_array($_SESSION)) {	    	
	    	if (array_key_exists('cryptomedic', $_SESSION) 
	    			&& array_key_exists('login.id', $_SESSION['cryptomedic']) 
	    			&& $_SESSION['cryptomedic']['login.id']) {
				$id = $_SESSION['cryptomedic']['login.id'];
				$user = User::find($id);
				$this->auth->login($user);
			}
		}		
    	return $next($request);
    }

}