<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class User extends Model
{
    public $timestamps = false;
    protected $fillable =[ 'name','email','phone','password'];

    public function userable()
    {
        return $this->morphTo();
    }
    public function getCustomer(){
  return  $this->userable;
}

}



