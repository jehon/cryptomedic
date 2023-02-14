<?php

namespace Cryptomedic\Lib;

class DatabaseInvalidStructureException extends \Exception {
    function __construct($table, $field = '') {
        parent::__construct("No structure for: $table" . ($field ? "#$field" : ""));
    }
}
