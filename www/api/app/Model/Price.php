<?php

namespace App\Model;

class Price extends CryptomedicModel
{
    protected $appends = array('_editable');

    public static function getLimit() {
		return date('Y-m-d', mktime(0, 0, 0, date('m'), date('d') + 5, date('Y')));
    }

    // Transient field: http://stackoverflow.com/a/17250429/1954789
    public function getEditableAttribute()
    {
    	if ($this->date_to) {
    		return false;
    	}

    	if ($this->date_from < self::getLimit()) {
    		return false;
    	}
        return true;
    }
}
