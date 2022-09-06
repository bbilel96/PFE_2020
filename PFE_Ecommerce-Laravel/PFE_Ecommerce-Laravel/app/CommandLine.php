<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommandLine extends Model
{
    public $timestamps = false;
    protected $guarded =[];
    public function command(){
        return $this->belongsTo(Command::class);
    }
    public function product(){
        return $this->belongsTo(Product::class);
    }
     public function products(){
        return $this->belongsToMany(Product::class, 'information', 'product_id')
            ->withPivot(['quantity','extra_option_id']);
    }
    public function informations(){
        return $this->hasMany(Information::class);

    }

}
