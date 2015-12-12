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
      if ($user) {
          $profile = $user->getProfile();
      } else {
          $profile = "public";
      }
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

		$data ['authorized'] = array();
		switch($data['group']) {
			case "readonly":
			case "backup":
			case "technical":
				break;
			case "admin":
			case "manager":
				$data['authorized'][] = "folder.edit";
				$data['authorized'][] = "folder.delete";
				$data['authorized'][] = "folder.unlock";
				break;
			case "cdc":
				$data['authorized'][] = "folder.edit";
				$data['authorized'][] = "folder.delete";
				break;

		}

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
		} else {
			/* Attemp old school */
			$res = DB::select('SELECT users.username as login, users.group as `group`, users.id as id FROM users '
    			. ' WHERE username = :username and old_password = SHA1(concat("' .  getGlobalConfig('authenticateSalt') . '", :password))',
				$credentials);
			if (count($res) == 1) {
				$user = array_pop($res);
				$user = User::find($user->id);

				// Login the user
				// Must be first, since $user->update() will require an auth user to update "last_user"
				Auth::login($user);

				// Update the password
				$user->password = bcrypt($credentials['password']);
				$user->old_password = null;
				$res = $user->update();

				// Return dynamic data
				return $this->getSettings();
			}
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

  function __construct($name, Role $base = null) {
    $this->name = $name;
    if ($base !== null) {
        AuthController::_createRole($name, $base->name);
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

  /****
  Public
        user not authenticated
      @authentication => authenticated
      @authentication + t&c valide => guest OR registered OR ... (according to profile)
  */
  $public = new Role("public");

  /****
  Authenticated (based on public)
      user is authenticated but did not accept the terms and conditions
      (s)he can do nothing
      @accept t&c => guest
  */
  $authenticated = (new Role("authenticated", $public))
    // User can view terms and conditions (latest one)
    ->givePermission("termsAndConditions.view")
    ;


  /****
  Guest (based on authenticated)
      User is ready to use the application.
      He still need to be accepted by an institution.

      @accepted by institution (admin) => registered OR validator OR bbmanager OR admin
  */
  $guest = (new Role("guest", $authenticated))
    // Has accepted T&C
    ->givePermission("termsAndConditions.skip") // Frontend only

    // Can list institutions
    ->givePermission("institutions.list")

    // Can create institution
    ->givePermission("institutions.create")

    // Can join institution
    ->givePermission("institutions.join")

    // Can enter its data's
    ->givePermission("myAccount.edit")

    // View the search options
    ->givePermission("samples.options")

    // A guest may see only the "summary" of a research on samples
    ->givePermission("samples.preview")
    ;



  /****
  Registered (based on guest)
      User is part of an institution/biobank.
      User can make research and ask for samples

      @accepted by institution as validator (admin) => validator
      @accepted by biobank as bbmanager (admin) => bbmanager
      @accepted by admin as admin (admin) => admin
  */
  $registered = (new Role("registered", $guest))
    // View its own institution
    ->givePermission("myInstitution.view") // Frontend only

    // Search samples
    ->givePermission("samples.search")

    // Send a request to ge samples to the biobanks
    ->givePermission("samples.request")
    ;


  /****
  Academic (based on registered)
    Same as Registered, but inside a biobank. Rights are equivalents...

  */
  $academic = (new Role("academic", $registered))
    ;


  /****
  Validator (based on registered)
      Manager of an institution.
      Can manage the users of its institution.

      @accepted by admin as admin (admin) => admin
  */
  $validator = (new Role("validator", $registered))
    // Manage (edit) its own institution
    ->givePermission("myInstitution.manage")

    // See the list of users of its own institution
    ->givePermission("myInstitution.usersList") // Used in the backend, in InstitutionModel
    ;


  /****
  Manager (based on validator)
      Is responsible of a biobank

      @accepted by admin as admin (admin) => admin
  */
  $manager = (new Role("manager", $validator))

    // See the statistics of its own bb
    ->givePermission("myInstitution.statistics")

    // See the statistics of its own bb
    ->givePermission("myInstitution.advancedSearch")

    // Upload a file for bbks
    ->givePermission("myInstitution.uploadFile")
    ;


  /****
  Admin (based on manager)
      General admin of the application.

      @accepted by institution as validator (admin) => validator
      @accepted by biobank as bbmanager (admin) => bbmanager
  */
  $admin = (new Role("admin", $manager))
    // Cannot join institution
    ->givePermission("institutions.join", false)

    // Cannot make an advanced search on its own institution
    ->givePermission("myInstitution.advancedSearch", false)

    // Allow the institution to be validated (and thus usable)
    ->givePermission("institutions.validate")

    // Manage (CRUD) all institutions
    ->givePermission("institutions.manage")

    // View the list of users of an institution
    ->givePermission("institutions.usersList") // Used in the backend, in InstitutionModel

    // Manage the institutions-biobank
    ->givePermission("institutions.manageAcronym") // Used in InstitutionsController

    // Can make an advanced search on an institution
    ->givePermission("institutions.advancedSearch")

    // Can change the terms and conditions
    ->givePermission("termsAndConditions.manage")

    // See the statistics of bbks
    ->givePermission("institutions.statistics")

    // Upload a file for bbks
    ->givePermission("institutions.uploadFile")

    // Can see website statistics
    ->givePermission("website.statistics")

    // View the security matrix
    ->givePermission("admin.securityMatrix")
    ;
}


