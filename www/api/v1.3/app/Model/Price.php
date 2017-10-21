<?php

namespace App\Model;

class Price extends CryptomedicModel
{
    protected $appends = array('_editable');

    public function priceLines() {
        return $this->hasMany('App\Model\PriceLine');
    }

    public static function create(array $attributes = array()) {
        $obj = parent::create($attributes);

        if (array_key_exists('price_lines', $attributes)) {
            $obj->syncSubItems(BillLine::class, $obj->priceLines(), $attributes['price_lines']);
        }

        $obj['price_lines'] = $obj->priceLines()->get();

        return $obj;
    }

    public static function updateWithArray($id, $attributes) {
        $obj = parent::updateWithArray($id, $attributes);

        if (array_key_exists('price_lines', $attributes)) {
            $obj->syncSubItems(PriceLine::class, $obj->priceLines(), $attributes['price_lines']);
        }

        $obj['price_lines'] = $obj->priceLines()->get();

        return $obj;
    }

    public static function getLimit() {
		return date('Y-m-d', mktime(0, 0, 0, date('m'), date('d') + 5, date('Y')));
    }

    // Transient field: http://stackoverflow.com/a/17250429/1954789
    public function getEditableAttribute()
    {
    	if ($this->dateto) {
    		return false;
    	}

    	if ($this->datefrom < self::getLimit()) {
    		return false;
    	}
        return true;
    }
}
