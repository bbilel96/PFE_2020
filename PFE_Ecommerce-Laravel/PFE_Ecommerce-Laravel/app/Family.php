<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    public $timestamps = false;
    protected $fillable=[
        'id',
        'name',
        'designation',
        'order_appearance',
        'subfamily_image',
        'subfamily_id'
    ];
    public function family(){
        return $this->belongsTo(Family::class);
    }
    public function families(){
        return $this->hasMany(Family::class);
    }
    public function products(){
        return $this->hasMany(Product::class);
    }

}
