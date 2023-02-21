<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Browsers extends Model {
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
                lastuser = '$login',
                browser_uuid = '$browserUUID',
                login = '$login'
            ON DUPLICATE KEY UPDATE
                updated_at = NOW(),
                lastuser = '$login' ");

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