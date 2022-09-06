<?php

namespace App\Http\Controllers;

use App\Family;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getFamily(){
        $f=Family::with('families')->where('family_id','=',Null)->get();
        foreach($f as $family) {
            $family["sub_families"] = $family['families'];
            unset($family['families']);
        }
        return $f;
    }
    public function getAll()
    {
        $f=Family::with('families')->where('family_id','=',Null)->get();
        foreach($f as $family){
            $family["sub_families"] = $family['families'];
            unset($family['families']);
            foreach($family->sub_families as $sub){
                $prod=$sub->products()->get();

                foreach($prod as $p){
                    $p->product_image='http://192.168.43.131:8000/'.$p->product_image;
                    $x=$p->extraCharge()->get();
                    $p->extraCharge=$x;
                    //array_push($p,$p->products);
                }


                $sub->products=$prod;



            }

            if($family->products()->get()!=null){
                $countP=0;
                $countS=0;



                foreach($family->products as $p){
                    $p->product_image='http://192.168.43.131:8000/'.$p->product_image;

                    $x=$p->extraCharge()->get();
                    $p->extraCharge=$x;
                    //array_push($p,$p->products);

                }
            }

        }

        return $f;

       /* $f= DB::table('families')->where('family_id','=',Null)->get();

        $array =array();
        $fArray=new Collection;
        $i=0;

        foreach ($f as $family){

           $array= Array(
                  'family' => Array (
                        'id'=>$family->id,
                        'designation'=>$family->designation,
                        'order_appearance'=>$family->order_appearance,
                        'subfamily_id'=>$family->family_id,
                        $col=new Collection
                        //'image'=>response()->file($family->subfamily_image)
                    )
                  );
                  $fArray->push($array);
                  foreach ($family->families as $subfamily){
                    $array2=Array(
                                'id'=>$subfamily->id,
                                'designation'=>$subfamily->designation,
                                'order_appearance'=>$subfamily->order_appearance
                    );
                                $fArray->$array->$col->push($array2);

                  }
            $fArray->Array->push($subfamily);
                };


return $fArray;*/

        }

       /* return array (

        );
    }*/

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Family  $family
     * @return \Illuminate\Http\Response
     */
    public function show(Family $family)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Family  $family
     * @return \Illuminate\Http\Response
     */
    public function edit(Family $family)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Family  $family
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Family $family)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Family  $family
     * @return \Illuminate\Http\Response
     */
    public function destroy(Family $family)
    {
        //
    }
}
