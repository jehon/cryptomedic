<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

define("BR_FILE", __DIR__ . "/../../../built/browsers.json");

class Browsers extends Model {
    static $supported = [];

    static function isSupported(string $browser, string $version): string {
        $browser = strtolower($browser);
        $version  =strtolower($version);

        if (!array_key_exists($browser, static::$supported)) {
            return "Unsupported browser: $browser";
        }

        if (!in_array($version, static::$supported[$browser])) {
            return "Unsupported version: $version";
        }

        return "Ok";
    }

    public static function clean(): array {
        return [
            "features" => DB::delete("
                    DELETE FROM browser_features
                    WHERE updated_at < curdate() - interval 6 month
                "),
            "login" => DB::delete("
                    DELETE FROM browser_login
                    WHERE updated_at < curdate() - interval 6 month
                ")
        ];
    }

    static public function storeStatistics(string $browserUUID, string $login, array $features): void {
        DB::insert("
            INSERT INTO browser_login SET
                created_at = NOW(),
                updated_at = NOW(),
                last_user = '$login',
                browser_uuid = '$browserUUID',
                login = '$login'
            ON DUPLICATE KEY UPDATE
                updated_at = NOW(),
                last_user = '$login' ");

        // Insert or update features in the browser_features table
        DB::table('browser_features')
            ->insertOrIgnore([
                "browser_uuid" => $browserUUID
            ]);

        DB::table('browser_features')
            ->where([ "browser_uuid" => $browserUUID])
            ->update($features);
    }
}

/**
 * 
 * Initialize
 * 
 */
foreach (json_decode(file_get_contents(constant("BR_FILE")), true)["browsers"] as $line) {
    $b = strtolower(explode(" ", $line)[0]);
    $v = explode(" ", $line)[1];

    if (!\array_key_exists($b, Browsers::$supported)) {
        Browsers::$supported[$b] = [];
    }
    Browsers::$supported[$b][] = $v;
}

