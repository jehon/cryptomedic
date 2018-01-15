<?php

return [
    'dsn' => "https://55876691584f4ef6955068b0ef4c73f5:83b12fffd6e94760b245cfb3e098062b@sentry.io/271432",

    // capture release as git sha
    // 'release' => trim(exec('git log --pretty="%h" -n1 HEAD')),

    // Capture bindings on SQL queries
    'breadcrumbs.sql_bindings' => true,

    // Capture default user context
    'user_context' => true,
];