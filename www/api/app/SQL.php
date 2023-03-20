<?php

namespace App;

define("NORMALIZE_SQL_BOOLEAN", "boolean");

class SQL {
    const BOOLEAN = "boolean";

    static function Normalize($data, $desc = []) {
        if (is_object($data)) {
            $data = (array) $data;
        }

        foreach($desc as $key => $type) {
            if (!array_key_exists($key, $data)) {
                continue;
            }

            switch($type) {
                case NORMALIZE_SQL_BOOLEAN:
                    $data[$key] = $data[$key] > 0;
                    break;
            }
        }
        return $data;
    }

    static function NormalizeList($list, $desc = []) {
        foreach($list as $i => $data) {
            $list[$i] = SQL::normalize($data, $desc);
        }
        return $list;
    }

    static function withCalculated($sql, $calculated = []) {
        return "
            SELECT *,
            " . 
                implode(
                    ',', 
                    array_map(fn ($k, $v) => "($v) as $k", array_keys($calculated), array_values($calculated))
                ) 
            . "
            FROM (
                    $sql
                ) AS results
        ";
    }
}