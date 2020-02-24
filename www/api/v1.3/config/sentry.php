<?php

if (!defined("RELEASE_FILE")) {
	define("RELEASE_FILE", __dir__ . "/../../../../www/build/release_version.txt");
}

if (file_exists(constant("RELEASE_FILE"))) {
	$release_version = file_get_contents(constant("RELEASE_FILE"));
} else {
	$release_version = "not defined";
}

return [
    'dsn' => "https://55876691584f4ef6955068b0ef4c73f5:83b12fffd6e94760b245cfb3e098062b@sentry.io/271432",

    // capture release
    'release' => $release_version,

    // Capture bindings on SQL queries
    'breadcrumbs.sql_bindings' => true,

    // Capture default user context
    'user_context' => true,
];
