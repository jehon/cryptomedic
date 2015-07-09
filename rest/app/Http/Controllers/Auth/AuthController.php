<?php namespace App\Http\Controllers\Auth;

use DB;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
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
	public function __construct(Guard $auth, Registrar $registrar)
	{
		$this->auth = $auth;
		$this->registrar = $registrar;
	
		// If activating this, you will be redirected to home on new login attempt
		// $this->middleware('guest', ['except' => 'getLogout']);
	}
	
	public function getSettings() {
		$data = array();
		$data['username'] = Auth::user()->username;
		$data['group'] = Auth::user()->group;

		
		$listing = DB::table('prices')->orderBy('id', 'ASC')->get();
		$data['prices'] = array();
		foreach($listing as $k => $v)
		{
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
				// and the rights of cdc:
			case "cdc":
				$data['authorized'][] = "folder.unlock";
				break;
				
		}
		
		// TODO: update last_login timestamp
		// TODO: log/record appVersion
		
		return response()->jsonOrJSONP($data);		
	}
	
	public function postMylogin() {
		$credentials = Request::only('username', 'password');
		
		if (Auth::attempt($credentials))
		{
			$user = Auth::user();
			$user->last_login = new \DateTime();
			$user->save();
			return $this->getSettings();
		} else {
			/* Attemp old school */
			$res = DB::select('SELECT users.username as login, users.group as `group`, users.id as id FROM users '
    			. ' WHERE username = :username and old_password = SHA1(concat("' .  getSecret('authenticateSalt') . '", :password))', 
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
		$this->auth->logout();
		return response()->jsonOrJSONP(null);
	}
	
}
