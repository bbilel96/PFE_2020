<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Customer;
use App\Http\Requests;
use App\Http\Resources\Customer as CustomerResource;

class CustomerController extends Controller
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
    public function getAll()
    {
            $c=Customer::all();
            foreach ($c as $keyc =>$client){
            $user=$c[$keyc]->users()->get();
            $client->name=$user[0]->name;
            $client->email=$user[0]->email;
            $client->phone=$user[0]->phone;
                $command=app("App\Http\Controllers\CommandController")->getCommand($client->id);
            $client['commands']=$command;

    }
            return $c;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Customer::create($request->all());
    }
    public function updateLongAtt(Request $req){
        $cust= Customer::find($req->id);
        if ($cust){
            $cust->latitude=$req->latitude;
            $cust->longitude=$req->longitude;
            $cust->save();
            return 1;
        }
        else{
            return 0;
        }
    }
    public function updateState(Request $id){
        $cust=Customer::find($id->id);
        if ($cust->state=='active'){
            $cust->state='blocked';
        }
        else{
            $cust->state='active';
        }
        $cust->save();
        return response()->json(1,200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Command  $command
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        $cust= Customer::findOrFail($customer->id);
        return new CustomerRessource($cust);
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
    public function update(Request $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Command  $command
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        //
    }
    public function addPos(Request $req){
        $email = User:: where('email', $req->email)->get()[0];
       $w=$email->userable()->get()[0];
       $w->latitude=$req->latitude;
       $w->longitude=$req->longitude;
       $w->save();
       return 1;
    }
}
