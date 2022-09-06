<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use app\User;
use App\Command;

class Customer extends model
{
    protected $fillable =[ 'state','latitude','longitude'];

    public function users()
    {
        return $this->morphMany('App\User', 'userable');
    }

    public function commands(){
        return $this->hasMany(Command::class);
    }
}
