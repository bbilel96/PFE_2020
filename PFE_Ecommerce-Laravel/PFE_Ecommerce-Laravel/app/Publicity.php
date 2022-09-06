<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publicity extends Model
{
    public $timestamps = false;
    public function products()
    {
        return $this->hasMany(Product::class,'id','product_id');
    }
}
