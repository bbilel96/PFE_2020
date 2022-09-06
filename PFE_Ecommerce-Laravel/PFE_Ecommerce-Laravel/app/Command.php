<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use app\Customer;

class Command extends Model
{

    protected $fillable =[ 'date_command','state','latitude_del','longitude_del','command_type','customer_id','total_price'];
    public $timestamps = false;
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function commandLines(){
        return $this->hasMany(CommandLine::class);
    }
    public function products(){
        // $c->products()->attach($p[4],['quantity'=>1])
        return $this->belongsToMany(Product::class,'command_lines','command_id','product_id')
        ->withPivot('quantity');
    }
}
