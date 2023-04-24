<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
		\App\Http\Middleware\MarkHeader::class
	];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\ServerStats::class,
        ],

        // Add some handlers from web: AddQueuedCookiesToResponse, StartSession, ShareErrorsFromSession
        'api' => [
            // \Illuminate\Routing\Middleware\ThrottleRequests::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\ServerStats::class,
            \App\Http\Middleware\MarkHeader::class
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware are ON DEMAND in api.php etc...
     *
     * @var array
     */
    protected $middlewareAliases = [
        'authenticated'   => \App\Http\Middleware\Authenticated::class,
        'hasPermission'   => \App\Http\Middleware\HasPermission::class
  ];
}
