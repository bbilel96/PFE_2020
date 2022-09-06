<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
   // protected $fillable=['name', 'designation', 'order_app', 'type', 'price', 'product_image'];
    public $timestamps = false;
    public function commandLines(){
        return $this->hasMany(CommandLine::class);
    }
    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function subProducts(){
        return $this->hasMany(Product::class);
    }
    public function family(){
        return $this->belongsTo(Family::class);
    }
    public function ExtraCharge(){
        return $this->belongsToMany(Product::class,'extra_charges_options','product_id','extra_option_id');

    }
    public function publicity()
    {
        return $this->belongsTo(Publicity::class);
    }
    public function commands(){
        return $this->belongsToMany(Command::class,'command_lines','product_id','command_id')
        ->withPivot('quantity');
    }
    public function linesCommands(){
        // $p[5]->linesCommands()->attach(['command_id'=>$cl->command_id],['product_id' => $cl->product_id,'quantity'=>3])
        return $this->belongsToMany(CommandLine::class,'information','extra_option_id','command_id')
            ->withPivot(['product_id','quantity']);
    }


}
