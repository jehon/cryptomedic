<?php

namespace App\Http\Middleware;

use Closure;
use App\Http\Controllers\Auth\AuthController;

class HasPermission
{
  /**
   * Run the request filter.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @param  string  $role
   * @return mixed
   */
  public function handle($request, Closure $next, $header)
  {
    if (!AuthController::hasPermission($header)) {
        return response("Unauthorized '$header'.", 401);
    }
    return $next($request);
  }
}
