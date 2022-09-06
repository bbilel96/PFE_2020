<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Admin extends User
{
    protected $guarded=[];
    public function users()
    {
        return $this->morphMany('App\User', 'userable');
    }

}
