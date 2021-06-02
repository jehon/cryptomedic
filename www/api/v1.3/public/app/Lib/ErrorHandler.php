<?php

# See https://www.php.net/manual/en/function.set-error-handler

// function mapErrorCode($code) {
//     $error = $log = null;
//     switch ($code) {
//         case E_PARSE:
//         case E_ERROR:
//         case E_CORE_ERROR:
//         case E_COMPILE_ERROR:
//         case E_USER_ERROR:
//             $error = 'Fatal Error';
//             $log = LOG_ERR;
//             break;
//         case E_WARNING:
//         case E_USER_WARNING:
//         case E_COMPILE_WARNING:
//         case E_RECOVERABLE_ERROR:
//             $error = 'Warning';
//             $log = LOG_WARNING;
//             break;
//         case E_NOTICE:
//         case E_USER_NOTICE:
//             $error = 'Notice';
//             $log = LOG_NOTICE;
//             break;
//         case E_STRICT:
//             $error = 'Strict';
//             $log = LOG_NOTICE;
//             break;
//         case E_DEPRECATED:
//         case E_USER_DEPRECATED:
//             $error = 'Deprecated';
//             $log = LOG_NOTICE;
//             break;
//         default:
//             break;
//     }
//     return array($error, $log);
// }

function handleError($code, $description, $file = null, $line = null, $context = null) {
    http_response_code(500);
    header('X-WHERE', 'bare-api');

    echo "Error thrown<br>";
    return false;

    // list($error, $log) = mapErrorCode($code);
    // $data = array(
    //     'level' => $log,
    //     'code' => $code,
    //     'error' => $error,
    //     'description' => $description,
    //     'file' => $file,
    //     'line' => $line,
    //     'context' => $context,
    //     'path' => $file,
    //     'message' => $error . ' (' . $code . '): ' . $description . ' in [' . $file . ', line ' . $line . ']'
    // );
    // var_dump($data);
}

set_error_handler("handleError");
ob_start();
