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
			$computer = SyncComputer::firstOrCreate([ "computer_id" => $computerId ]);
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

}
