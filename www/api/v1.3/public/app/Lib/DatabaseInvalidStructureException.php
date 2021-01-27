<?php

namespace Cryptomedic\Lib;

class DatabaseInvalidStructureException extends BusinessException {
    function __construct($table, $field = '') {
        parent::__construct("No structure for: $table" . ($field ? "#$field" : ""));
    }
}
