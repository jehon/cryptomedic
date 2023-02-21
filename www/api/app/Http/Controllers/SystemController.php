<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\Lists;

class SystemController extends Controller {
    static public function allLists() {
        return Lists::getAll();
    }
}
