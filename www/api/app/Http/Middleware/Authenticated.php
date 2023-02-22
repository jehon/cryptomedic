<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticated {

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
	public function __construct(Guard $auth) {
		$this->auth = $auth;
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next) {
		// --- Begin
		// Export to bare server
		// See Auth.php
		// www/api/public/app/Lib/Auth.php
		// TODO(BRIDGE): bridge to bare server
		global $bareUserName;
		global $bareUserGroup;
		$user = Auth::user();
		if ($user) {
			$bareUserName = $user['username'];
			$bareUserGroup = $user['group'];
		}
		// echo $bareAuthLogin . "<br>\n";
		// --- End

		if ($this->auth->guest() || !$request->user()->group) {
			return response('Unauthorized by Rest server.', 401);
		}
		return $next($request);
	}
}
