<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\ErrorHandler\Exception\FlattenException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

class Handler extends ExceptionHandler {
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    // protected $dontReport = [
    //     \Illuminate\Auth\AuthenticationException::class,
    //     \Illuminate\Auth\Access\AuthorizationException::class,
    //     \Symfony\Component\HttpKernel\Exception\HttpException::class,
    //     \Illuminate\Database\Eloquent\ModelNotFoundException::class,
    //     \Illuminate\Session\TokenMismatchException::class,
    //     \Illuminate\Validation\ValidationException::class,
    // ];

    protected function convertExceptionToResponse(Throwable $e) {
        $html = "\n<pre>"
            . jTraceEx($e)
            . "</pre>";

        $e = FlattenException::create($e);

        return SymfonyResponse::create($html, $e->getStatusCode(), $e->getHeaders());
    }
}


function jTraceEx($e, $seen = null) {
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
            $result[] = sprintf(' ... %d more', count($trace) + 1);
            break;
        }
        $mine = count($trace) && array_key_exists('class', $trace[0]) && (substr($trace[0]['class'], 0, 3) == "App");
        $result[] = sprintf(
            ' at %s %s%s%s(%s)',
            count($trace) && ($mine ? "***" : '   '),
            count($trace) && array_key_exists('class', $trace[0]) ? str_replace('\\', '.', $trace[0]['class']) : '',
            count($trace) && array_key_exists('class', $trace[0]) && array_key_exists('function', $trace[0]) ? '.' : '',
            count($trace) && array_key_exists('function', $trace[0]) ? str_replace('\\', '.', $trace[0]['function']) : '(main)',
            $line === null ? $file : basename($file) . ':' . $line
        );
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
