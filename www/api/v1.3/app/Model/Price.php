<?php

namespace App\Model;

class Price extends CryptomedicModel
{
    protected $appends = array('_editable');

    // Transient field: http://stackoverflow.com/a/17250429/1954789
    public function getEditableAttribute()
    {
        return false;
    }
}
