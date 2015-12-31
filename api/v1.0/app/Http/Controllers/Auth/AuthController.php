<?php

namespace App\Http\Controllers\Auth;

use DB;
use App\SyncComputer;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Http\Controllers\PriceController;
use Route;

use \References;

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

	use AuthenticatesAndRegistersUsers;

	static protected $permissions = [];

  static public function hasPermission($header) {
      $user = Auth::user();
      $profile = $user->group;
      if (!array_key_exists($profile, self::$permissions)) {
          abort(500, "invalid profile in hasPermission: $profile");
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

	/**
	 * Create a new authentication controller instance.
	 *
	 * @param  \Illuminate\Contracts\Auth\Guard  $auth
	 * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
	 * @return void
	 */
	// public function __construct()
	// {
	// 	// If activating this, you will be redirected to home on new login attempt
	// 	// $this->middleware('guest', ['except' => 'getLogout']);
	// }

	public function getSettings() {
    // sleep(3);
		if (!Auth::user()) {
			abort(401);
		}
		$data = array();
		$data['username'] = Auth::user()->username;
		$data['group'] = Auth::user()->group;
		$data['name'] = Auth::user()->name;

		$listing = DB::table('prices')->orderBy('id', 'ASC')->get();
		$data['prices'] = array();
		foreach($listing as $v) {
			$data['prices'][$v->id] = $v;
		}

		$data['codes'] = References::$codes;
    $data['associations'] = References::$associations;
		$data['authorized'] = self::$permissions[$data['group']];

		// Update last_login timestamp
		$user = Auth::user();
		$user->last_login = new \DateTime();
		$user->save();

		if (Request::input("computerId", false)) {
			// Record the computer Id into database and session
			$computerId = Request::input("computerId");
			$computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);
			$computer->useragent = $_SERVER['HTTP_USER_AGENT'];
			$computer->cryptomedic_version = Request::input("appVersion", "");
			if (strpos($computer->user_list, Auth::user()->username) === false) {
				$computer->user_list .= ',' . Auth::user()->username;
			}
			$computer->save();
			session()->put('computerId', $computerId);
		}

		/*
		 * TODO: Define a security key
		 *
		 * - The security key should be unique by [ computerId ]
		 * - How and when should we deprecate a key?
		 * 		- two keys: old and new -> when we receive data signed with "new" key, old is deprecated
		 * - What to sign, and how to sign it?
		 * 		- date of modification
		 *      - type of modification
		 *      - user who made it (for security checks)
		 *      - data
		 *      - folderId (for tracking)
		 */

		return response()->jsonOrJSONP($data);
	}

	public function postMylogin() {
		$credentials = Request::only('username', 'password');
		if (\getenv('BYPASS_AUTHENTICATION')) {
			$user = User::where("username", $credentials['username'])->first();
			Auth::login($user);
			return $this->getSettings();
		}

		if (Auth::attempt($credentials))
		{
			return $this->getSettings();
		}
		return abort(406, "Invalid credentials");
	}

	public function getLogout() {
		Auth::logout();
		return response()->jsonOrJSONP(null);
	}

  public function matrix() {
      $profiles = array_keys(self::$permissions);
      // sort($profiles);

      $headers = [];
      foreach(self::$permissions as $profile => $rights) {
          $headers = $headers + array_keys($rights);
      }
      sort($headers);
      $headers = array_unique($headers);

      $res = "<style>table, tr, td { border: 1px solid }</style>";
      $res .= "<style>table { border-collapse: collapse; width: 100% }</style>";

      $res .= "<h3>HasPermission</h3>";
      $res .= "<table>";
      $res .= "<tr><td>PROFILE</td><td>" . implode("</td><td>", $profiles) . "</td></tr>\n";

      foreach($headers as $header) {
          $res .= "<tr><td>$header</td>";
          foreach($profiles as $profile) {
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
      $list->uasort(function($a, $b) {
          return ($a->getPath() == $b->getPath() ? 0 :
              ($a->getPath() < $b->getPath() ? -1 : 1));
        });
      foreach ($list as $i => $r) {
        $res .= "<tr>";
        $res .= "<td><a href='/" . $r->getPath() . "'>" . $r->getPath() . "</a></td>";
        $res .= "<td>" . implode(", ", $r->getMethods()) . "</td>";
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
}

{
  /**************************************************************/
  /*  ASSIGNING ROLES *******************************************/
  /**************************************************************/

  (new Role("readonly"))
    ->givePermission("folder.read")
  	->givePermission("reports.execute")
  	;

  (new Role("cdc", "readonly"))
    ->givePermission("folder.edit")
    ->givePermission("folder.delete")
    ;

  (new Role("physio", "cdc"))
    ;

  (new Role("orthesist", "cdc"))
    ;

  (new Role("manager", "cdc"))
  	->givePermission("folder.unlock")
  	->givePermission("users.manage")
  	;

  (new Role("admin", "manager"))
    ->givePermission("admin.securityMatrix")
  	;
}
