<?php

namespace App\Http\Controllers;

use App\Publicity;
use Illuminate\Http\Request;

class PublicityController extends Controller
{
    public  function getAll(){
        $pub=Publicity:: all();
        $arrayPub=array();
        $x=0;
        foreach( $pub as $keyPub => $pu){
            $p=$pub[$keyPub]->products;

           $f=$p[0]->family;

           unset($p[0]['products']);




           if (empty($f->family)){
               $f['products']=[];

               unset($p[0]['family']);

               $f['products']=$p;
                $f['products'][0]->product_image='http://192.168.43.131:8000/'.$f['products'][0]->product_image;
               $f['products'][0]['extraCharge']=$f['products'][0]->extraCharge;
               $f['products'][0]['extra_charge']=null;
                unset($f['family']);
                $f['sub_families']=[];
                $pu['command']=$f;
                unset($pub[$keyPub]['products']);
               // $pub['products']
              //  $pubarray=array($pu, 'products'=>$f);

               array_push ($arrayPub, $pub[$keyPub]);
           }
           else{
                   unset($p[0]['family']);
                   $arraysub = array($f['family']);
                   unset($f['family']);
                   $f['products'] = [];
                   //return $f->products;
                   $f['products'] = $p;
               $f['products'][0]->product_image='http://192.168.43.131:8000/'.$f['products'][0]->product_image;
                   $f['products'][0]->extraCharge;
                   $f['products'][0]['extraCharge']=$f['products'][0]->extraCharge;

                   $f['products'][0]['extra_charge']=null;
                   $arraysub[0]['sub_families'] = [$f];
                   unset($pub[$keyPub]['products']);
                   $pub[$keyPub]['command'] = $arraysub[0];
                  // return $arraysub;
                   array_push($arrayPub, $pub[$keyPub]);
           }
        }
        return $arrayPub;
    }
}
