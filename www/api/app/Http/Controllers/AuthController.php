<?php

namespace App\Http\Controllers;

use DB;
use App\Model\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Route;

use App\Model\Browsers;
use App\Model\Lists;

class AuthController extends Controller {
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    static protected $permissions = [];

    static public function hasPermission($header) {
        $user = Auth::user();
        if (!$user) {
            return false;
        }
        $profile = $user->group;
        if (!array_key_exists($profile, self::$permissions)) {
            abort(500, "Rest: Invalid profile in hasPermission: $profile");
        }
        return array_key_exists($header, self::$permissions[$profile])
            ? self::$permissions[$profile][$header]
            : false;
    }

    static public function _createRole($profile, $basedOn = null) {
        if ($basedOn) {
            if (!array_key_exists($basedOn, self::$permissions)) {
                abort(500, "Could not find $basedOn to create $profile");
            }
            self::$permissions[$profile] = self::$permissions[$basedOn];
        } else {
            self::$permissions[$profile] = [];
        }
    }

    static public function _givePermission($profile, $header, $value = true) {
        if (!array_key_exists($profile, self::$permissions)) {
            abort(500, "invalid profile in givePermission: $profile");
        }

        self::$permissions[$profile][$header] = $value;
    }

    public function storeStatistics() {
        $data = Request::all();

        if (array_key_exists('browser', $data)) {
            $browserData = $data['browser'];
            $uuid = $browserData['browser_uuid'];
            unset($browserData['browser_uuid']);

            $browserData["browser_supported"] = Browsers::isSupported($browserData['browser_name'], $browserData['browser_version']);

            Browsers::storeStatistics($uuid, Auth::user()->username, $browserData);
        }
    }

    /**
     * Create a new authentication controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\Guard  $auth
     * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
     * @return void
     */

    public function getSettings() {
        if (!Auth::user()) {
            abort(401);
        }
        $this->storeStatistics();

        $data = array();
        $data['username'] = Auth::user()->username;
        $data['group'] = Auth::user()->group;
        $data['name'] = Auth::user()->name;
        $data['email'] = Auth::user()->email;

        $listing = DB::table('prices')
            ->orderBy('id', 'ASC')
            ->get();

        $data['prices'] = array();
        foreach ($listing as $v) {
            $data['prices'][$v->id] = $v;
        }

        // Order is important: getAllList will get all the lists
        $data['lists'] = Lists::getLists();
        $data['codes'] = Lists::getCodes();
        $data['associations'] = Lists::getAssociations();

        $data['authorized'] = array_keys(self::$permissions[$data['group']]);

        // Update last_login timestamp
        $user = Auth::user();
        $user->last_login = new \DateTime();
        $user->save();

        return response()->json($data);
    }

    public function postMylogin() {
        $credentials = Request::only('username', 'password');
        global $myconfig;
        if (Auth::attempt($credentials)) {
            return $this->getSettings();
        }
        return abort(404, "Invalid credentials");
    }

    public function getLogout(Request $request) {
        Auth::logout();
        if (\Illuminate\Support\Facades\Request::ajax()) {
            // if ($request->isAjax()) {
            return response()->json(null);
        }
        return redirect('/static/logout.html');
    }

    public function matrix() {
        $profiles = array_keys(self::$permissions);
        // sort($profiles);

        $headers = [];
        foreach (self::$permissions as $profile => $rights) {
            $headers = $headers + array_keys($rights);
        }
        sort($headers);
        $headers = array_unique($headers);

        $res = "<style>table, tr, td { border: 1px solid }</style>";
        $res .= "<style>table { border-collapse: collapse; width: 100% }</style>";

        $res .= "<h3>HasPermission</h3>";
        $res .= "<table>";
        $res .= "<tr><td>PROFILE</td><td>" . implode("</td><td>", $profiles) . "</td></tr>\n";

        foreach ($headers as $header) {
            $res .= "<tr><td>$header</td>";
            foreach ($profiles as $profile) {
                $res .= "<td>" . (array_key_exists($header, self::$permissions[$profile])
                    ? (self::$permissions[$profile][$header] === true ? "V" : self::$permissions[$profile][$header])
                    : "-") . "</td>";
            }
            $res .= "</tr>";
        }
        $res .= "</table>";

        $res .= "<h3>Routes</h3>";
        $res .= "<table>";
        // $routes = array_keys(get_object_vars($routeCollection));
        // sort($routes);
        // var_dump($routes);
        $list = Route::getRoutes()->getIterator();
        $list->uasort(function ($a, $b) {
            return ($a->uri() == $b->uri() ? 0 : ($a->uri() < $b->uri() ? -1 : 1));
        });
        foreach ($list as $i => $r) {
            $res .= "<tr>";
            $res .= "<td><a href='/" . $r->uri() . "'>" . $r->uri() . "</a></td>";
            $res .= "<td>" . implode(", ", $r->methods()) . "</td>";
            $res .= "<td>" . implode(", ", $r->middleware()) . "</td>";
            $res .= "</tr>";
        }
        $res .= "</table>";

        return $res;
    }
}

class Role {
    protected $b;
    protected $name;

    function __construct($name, $base = null) {
        $this->name = $name;
        if ($base !== null) {
            AuthController::_createRole($name, $base);
        } else {
            AuthController::_createRole($name);
        }
    }

    function givePermission($transaction, $value = true) {
        AuthController::_givePermission($this->name, $transaction, $value);
        return $this;
    }
} {
    /**************************************************************/
    /*  ASSIGNING ROLES *******************************************/
    /**************************************************************/ (new Role("readonly"))
        ->givePermission("application.open")
        ->givePermission("folder.read")
        ->givePermission("reports.execute")
        ->givePermission("planning.execute");

    (new Role("cdc", "readonly"))
        ->givePermission("folder.edit")
        ->givePermission("folder.delete");

    (new Role("physio", "cdc"));

    (new Role("orthesist", "cdc"));

    (new Role("manager", "cdc"))
        ->givePermission("folder.unlock")
        ->givePermission("price.edit")
        ->givePermission("users.manage");

    (new Role("admin", "manager"))
        ->givePermission("admin.securityMatrix")
        ->givePermission("admin.checkPictures");
}
