<?php

namespace Cryptomedic\Lib;

class Auth {
    static function isLoggedIn(): bool {
        return self::getLogin() !== false;
    }

    static function getLogin(): string {
        // See Authenticated.php Authenticated.php
        // www/api/v1.3/app/Http/Middleware/Authenticated.php
        // TODO(BRIDGE): bridge to bare server
        global $bareUserName;
        return $bareUserName;
        // return $_SESSION['bare_username'];
    }

    static function storeStatistics(string $browserUUID, string $login, array $features): void {
        Database::exec("
INSERT INTO browser_login SET
    created_at = NOW(),
    updated_at = NOW(),
    lastuser = '$login',
    browser_uuid = '$browserUUID',
    login = '$login'
ON DUPLICATE KEY UPDATE
    updated_at = NOW(),
    lastuser = '$login' ");

        // Insert or update features in the browser_features table
        $featuresSql = Database::buildSetStatement('browser_features', $features);

        Database::exec("
INSERT INTO browser_features SET
    created_at = NOW(),
    browser_uuid = '$browserUUID',
    $featuresSql
ON DUPLICATE KEY UPDATE
    updated_at = NOW(),
    lastuser = '$login',
    $featuresSql");
    }
}
