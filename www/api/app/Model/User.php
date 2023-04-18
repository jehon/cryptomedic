<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
	protected $guarded = array('id');

    use Notifiable;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $garded = [
        'password', 'remember_token',
    ];

   /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['hasAPassword'];

    public function getHasAPasswordAttribute() {
        return $this->password > ""; 
    }

}
