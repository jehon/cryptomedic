<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

use Symfony\Component\Debug\Exception\FlattenException;
use Symfony\Component\Debug\ExceptionHandler as SymfonyExceptionHandler;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;


class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest('login');
    }



    protected function convertExceptionToResponse(Exception $e)
    {
        $html = "<pre>"
                . jTraceEx($e)
                . "</pre>";

        // From parent...
        $e = FlattenException::create($e);

        // $handler = new SymfonyExceptionHandler(config('app.debug'));

        // $html = $handler->getHtml($e);


        return SymfonyResponse::create($html, $e->getStatusCode(), $e->getHeaders());
    }

}




function jTraceEx($e, $seen=null) {
    $starter = $seen ? 'Caused by: ' : '';
    $result = array();
    if (!$seen) $seen = array();
    $trace  = $e->getTrace();
    $prev   = $e->getPrevious();
    $result[] = sprintf('%s%s: %s', $starter, get_class($e), $e->getMessage());
    $file = $e->getFile();
    $line = $e->getLine();
    while (true) {
        $current = "$file:$line";
        if (is_array($seen) && in_array($current, $seen)) {
            $result[] = sprintf(' ... %d more', count($trace)+1);
            break;
        }
        $result[] = sprintf(' at %s %s%s%s(%s%s%s)',
            count($trace) && array_key_exists('class', $trace[0]) && substr($trace[0]['class'], 0, 3) == "App" ? "***" : '   ',
            count($trace) && array_key_exists('class', $trace[0]) ? str_replace('\\', '.', $trace[0]['class']) : '',
            count($trace) && array_key_exists('class', $trace[0]) && array_key_exists('function', $trace[0]) ? '.' : '',
            count($trace) && array_key_exists('function', $trace[0]) ? str_replace('\\', '.', $trace[0]['function']) : '(main)',
            $line === null ? $file : basename($file),
            $line === null ? '' : ':',
            $line === null ? '' : $line);
        if (is_array($seen))
            $seen[] = "$file:$line";
        if (!count($trace))
            break;
        $file = array_key_exists('file', $trace[0]) ? $trace[0]['file'] : 'Unknown Source';
        $line = array_key_exists('file', $trace[0]) && array_key_exists('line', $trace[0]) && $trace[0]['line'] ? $trace[0]['line'] : null;
        array_shift($trace);
    }
    $result = join("\n", $result);
    if ($prev)
        $result  .= "\n" . jTraceEx($prev, $seen);

    return $result;
}
