<?php

namespace App\Http\Controllers;

use App\Command;
use App\CommandLine;
use App\Customer;
use App\Family;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Table;

class CommandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $requ)
    {

        $c = new Command();
        $c->date_command = $requ->date_command;
        $c->state = $requ->state;
        $c->latitude_del = $requ->latitude_del;
        $c->total_price = $requ->total_price;
        $c->command_type = $requ->command_type;
        $c->longitude_del = $requ->longitude_del;
        $c->customer_id = $requ->customer_id;
        $c->save();
        for ($i = 0; $i < count($requ->products); $i++) {

            if (empty($requ->products[$i]['sub_families'])) {
                for ($j = 0; $j < count($requ->products[$i]['products']); $j++) {
                    $p = Product::find($requ->products[$i]['products'][$j]['id']);
                    $c->products()->attach($p, ['quantity' => $requ->products[$i]['products'][$j]['count']]);
                    if (!empty($requ->products[$i]['products'][$j]['extraCharge'])) {
                        for ($x = 0; $x < count($requ->products[$i]['products'][$j]['extraCharge']); $x++) {
                            $e = Product::find($requ->products[$i]['products'][$j]['extraCharge'][$x]['id']);
                            $lc = CommandLine::select('*')->where('product_id', $p->id)->where('command_id', $c->id)->get();
                            $e->linesCommands()->attach(['command_id' => $lc[0]->command_id], ['product_id' => $lc[0]->product_id, 'quantity' => $requ->products[$i]['products'][$j]['extraCharge'][$x]['count']]);
                        }
                    }
                }
            } else {


                for ($j = 0; $j < count($requ->products[$i]['sub_families']); $j++) {
                    for ($x = 0; $x < count($requ->products[$i]['sub_families'][$j]['products']); $x++) {
                        $p = Product::find($requ->products[$i]['sub_families'][$j]['products'][$x]['id']);
                        $c->products()->attach($p, ['quantity' => $requ->products[$i]['sub_families'][$j]['products'][$x]['count']]);
                        if (!empty($requ->products[$i]['sub_families'][$j]['products'][$x]['extraCharge'])) {
                            for ($y = 0; $y < count($requ->products[$i]['sub_families'][$j]['products'][$x]['extraCharge']); $y++) {
                                $e = Product::find($requ->products[$i]['sub_families'][$j]['products'][$x]['extraCharge'][$y]['id']);
                                $lc = CommandLine::select('*')->where('product_id', $p->id)->where('command_id', $c->id)->get();
                                $e->linesCommands()->attach(['command_id' => $lc[0]->command_id], ['product_id' => $lc[0]->product_id, 'quantity' => $requ->products[$i]['sub_families'][$j]['products'][$x]['extraCharge'][$y]['count']]);
                            }
                        }
                    }
                }

            }

        }
        return 1;
    }





    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    /* public function store(Request $command,Request $requ)
     {
         $cust=new Customer;
         $cust->id=$requ->id;
         $cust->save();
         $com=new Command;
                 $com->state="active";
                 $com->latitude=$command->latitude;
                 $com->longitude=$command->longitude;
                 $com->save();

                 $command->create(['state'=>$com->state ,'latitude_del'=>$com->latitude,'longitude_del'=>$com->longitude,'customer_id'=>$cust->id]);
     }*/

    /**
     * Display the specified resource.
     *
     * @param \App\Command $command
     * @return \Illuminate\Http\Response
     */
    public function getCommand($id)
    {

        $cust = Customer::find($id);

        $command=$cust->commands()->get();

        $c = $cust->commands()->get()->toArray();

        if (count($c)==0){
            return 0;
        }
        else{
            foreach ($c as $keyc=>$c1) {
                $c[$keyc]['products']=array();
                $f = app("App\Http\Controllers\FamilyController")->getAll();
                $copief = $f;
                $lc = $command[$keyc]->commandLines()->get();
                $x = 0;
                foreach ($copief as $keyf => $family) {
                    if (count($family['sub_families']) == 0) {
                        foreach ($family['products'] as $key => $p) {

                            if ($lc->where('product_id', $p->id)->count() == 0) {
                                unset($family['products'][$key]);
                            } else {
                                $family['products'][$key]->extraCharge = [];
                                foreach ($lc as $lckey => $lc1) {
                                    if ($lc1->product_id == $p->id) {
                                        $p['count'] = $lc1->quantity;
                                        $i = DB::table('information')->where('command_id', $lc1->command_id)->where('product_id', '=', $lc1->product_id)->get();
                                        $arraye = array();
                                        foreach ($i as $keyi => $i1) {
                                            $e = Product::find($i1->extra_option_id);
                                            if ($e != []) {
                                                $e['count'] = $i1->quantity;
                                                array_push($arraye, $e);
                                            }
                                        }
                                        $p['extraCharge'] = $arraye;
                                    }
                                }
                            }
                        }
                        if (count($family->products) == 0) {
                            unset ($copief[$keyf]);
                        } else {
                            $arrayp = array();
                            foreach ($family['products'] as $keyp => $p) {
                                array_push($arrayp, $family['products'][$keyp]);
                            }
                            unset($family['products']);
                            $family['products'] = $arrayp;
                        }
                    } else {
                        $arraysub = array();
                        foreach ($family['sub_families'] as $subkey => $sub) {

                            foreach ($sub['products'] as $key => $p) {
                                if ($lc->where('product_id', $p->id)->count() == 0) {
                                    unset($sub['products'][$key]);
                                } else {
                                    unset($sub['products'][$key]->extraCharge);
                                    foreach ($lc as $lckey => $lc1) {
                                        if ($lc1->product_id == $p->id) {
                                            $p['count'] = $lc1->quantity;

                                            $i = DB::table('information')->where('command_id', $lc1->command_id)->where('product_id', '=', $lc1->product_id)->get();
                                            $arraye = array();
                                            foreach ($i as $keyi => $i1) {
                                                $e = Product::find($i1->extra_option_id);
                                                if ($e != []) {
                                                    $e['count'] = $i1->quantity;

                                                    array_push($arraye, $e);
                                                    //return $p['extraCharge'];
                                                }

                                            }
                                            $p['extraCharge'] = $arraye;

                                        }
                                    }
                                }
                            }
                            if (count($sub['products']) == 0) {
                                unset ($family['sub_families'][$subkey]);
                            }


                        }


                        if (count($family['sub_families']) == 0) {
                            unset ($copief[$keyf]);
                        } else {

                            foreach ($family['sub_families'] as $subkey => $sub) {

                                if (count($sub['products']) == 0) {
                                    unset ($family['sub_families'][$subkey]);
                                } else {
                                    array_push($arraysub, $family['sub_families'][$subkey]);
                                    $arrayp = array();
                                    foreach ($sub['products'] as $pkey => $p) {
                                        array_push($arrayp, $sub['products'][$pkey]);
                                    }
                                    if (count($arraysub)!=0) {
                                        $arraysub[count($arraysub) - 1]['products'] = $arrayp;
                                    }
                                    else{
                                        $arraysub[count($arraysub)]['products']=$arrayp;
                                    }
                                    //$sub['products']=$arrayp;


                                    //array_push($family['sub_families1'],$arraysub);

                                    // unset( $family['sub_families'][$subkey]);


                                    //array_push($family['sub_families'][$subkey],$arraysub['products']);

                                }


                            }
                            $family['sub_families'] = $arraysub;



                        }


                }

                }
                foreach($copief as $keyf=>$family){
                    array_push($c[$keyc]['products'],$copief[$keyf]);
                }





            }
            krsort($c);
            $c0=array();
            foreach($c as $keyc =>$c1){
                array_push($c0, $c[$keyc]);
            }
            return $c0;
        }
    }








    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Command  $command
     * @return \Illuminate\Http\Response
     */
    public function edit(Command $command)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Command  $command
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Command $command)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Command  $command
     * @return \Illuminate\Http\Response
     */
    public function destroy($command)
    {
        return DB::table('commands')->where('id',$command)->update(['state'=> 'cancel']);
    }
}
