<?php namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel {

	/**
	 * The application's global HTTP middleware stack.
	 *
	 * @var array
	 */
	protected $middleware = [
		'Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode',
		'Illuminate\Cookie\Middleware\EncryptCookies',
		'Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse',
		'Illuminate\Session\Middleware\StartSession',
		'Illuminate\View\Middleware\ShareErrorsFromSession',
//		'App\Http\Middleware\VerifyCsrfToken', // TODO: reactivate CSRF protection
		'App\Http\Middleware\PHPRestBinding', // TODO CLEANUP: remove link with old rest package (as of before 14/07)
		'App\Http\Middleware\OfflineData'
	];
	
	/**
	 * The application's route middleware.
	 *
	 * @var array
	 */
	protected $routeMiddleware = [
		'authenticated' => 'App\Http\Middleware\Authenticated',
		'writeGroup' => 'App\Http\Middleware\WriteGroup',
		'unFreezeGroup' => 'App\Http\Middleware\UnFreezeGroup',
		'auth.basic' => 'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth',
		'guest' => 'App\Http\Middleware\RedirectIfAuthenticated',
	];
}
