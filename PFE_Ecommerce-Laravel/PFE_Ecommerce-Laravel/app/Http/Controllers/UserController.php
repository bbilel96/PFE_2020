<?php

namespace App\Http\Controllers;

use App\Mail\CheckingAccount;
use App\Mail\OrderProductMail;
use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use App\Customer;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Builder;
use resources\views\emails\order_product;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
    public function checkEmail(Request $requ)
    {
        return   User:: where('email', $requ->email)->exists();
    }
    public function checkEmailForUp(Request $requ){
        $emailcheck = User:: where('email', $requ->email)->exists();

        if (!$emailcheck) {
            return array(
                "success" => false,
                "code" => 9010,
                "response" => null
            );
        } else {

            //$email=DB::table('users') -> where ('email',$requ->email)->where('password',$requ->password)->get();
            //$email->getCustomer();
            $email = User:: where('email', $requ->email)->get();
                $w = $email[0]->userable()->get()[0];
                $custArray = array("id" => $w->id,
                    "name" => $email[0]->name,
                    "email" => $email[0]->email,
                    "password" => $email[0]->password,
                    "phone" => $email[0]->phone,
                    "type" => $email[0]->userable_type,
                    "state" => $w->state,
                    "longitude" => $w->longitude,
                    "latitude" => $w->latitude);
                return array("success" => true, "code" => 200, "response" => $custArray);
        }
    }
    public function getEmail(Request $requ)
    {
        $emailcheck = User:: where('email', $requ->email)->exists();

        if (!$emailcheck) {
            return array(
                "success" => false,
                "code" => 9010,
                "response" => null
            );
        } else {

            //$email=DB::table('users') -> where ('email',$requ->email)->where('password',$requ->password)->get();
            //$email->getCustomer();
            $email = User:: where('email', $requ->email)->get();
            if (Hash::check($requ->password, $email[0]->password)) {
                $w = $email[0]->userable()->get()[0];
                $custArray = array("id" => $w->id,
                    "name" => $email[0]->name,
                    "email" => $email[0]->email,
                    "password" => $email[0]->password,
                    "phone" => $email[0]->phone,
                    "type" => $email[0]->userable_type,
                    "state" => $w->state,
                    "longitude" => $w->longitude,
                    "latitude" => $w->latitude);
                return array("success" => true, "code" => 200, "response" => $custArray);
            } else {
                return array(
                    "success" => false,
                    "code" => 901,
                    "response" => null
                );
            }
        }
    }
    public function updateAccount (Request $requ){
        $email = User:: where('email', $requ->email)->get()[0];

        $email->name= $requ->name;
        if ($requ->password != '') {
            $email->password = Hash::make($requ->password);
        }
        $email->phone = $requ->phone;
        $email->save();

            $w = $email->userable()->get()[0];

            $custArray = array("id" => $w->id,
                "name" => $email->name,
                "email" => $email->email,
                "password" => $email->password,
                "phone" => $email->phone,
                "type" => $email->userable_type,
                "state" => $w->state,
                "longitude" => $w->longitude,
                "latitude" => $w->latitude);
            return  array(
            "success" => true,
            "code" => 200,
            "response" => $custArray
        );


    }

    public function resetPassword(Request $requ){

        $affected=DB::update ("update users set password=? where email=?",[Hash::make($requ->password),$requ->email]);
        if($affected==1)
        {
            return array(
                "success"   =>true,
                "code"      =>200,
                "response"  =>"updated !"
            );
        }
        else
        if ($affected==0)
        {
                return array(
                    "success"   =>false,
                    "code"      =>404,
                    "response"  =>"not found"
                );
        }
        else
        {
            return array(
                    "success"   =>false,
                    "code"    =>500,
                    "response"  =>"something wrong"
            );
        }
    }
    public function sendMail(Request $requ){
        $emailcheck=DB::table('users')->where('email',$requ->email)->exists();
        if ($emailcheck)
        {
            return array("success" => false, "code" => 900, "response" => "already exist");
        }
        else {
            $to_name = $requ->name;
            $rand=$this->randomString();
            $to_email = $requ->email;
            $data = array('rand' => $rand, "name" => $to_name);
            Mail::to($to_email)->send(new CheckingAccount($data));

        }
         return array("success" => true, "code" => 200, "response" => $rand);
    }
    function randomString() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 4; $i++) {
            $randomString .= $characters[Rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    public function create(Request $requ)
    {




                $cust = new Customer;
                $cust->state = $requ->state;
                $cust->latitude = $requ->latitude;
                $cust->longitude = $requ->longitude;
                $cust->save();
                $cust->users()->create(['name' => $requ->name, 'email' => $requ->email, 'password' => Hash::make($requ->password), 'phone' => $requ->phone]);
                return array("success" => true, "code" => 200, "response" => 'Customer created succesfully');



    }
    public function getAll(){

        $cust=Customer::all();
        foreach($cust as $keyc=>$c){
            $user=$cust[$keyc]->users()->get();

            $cust[$keyc]['name']=$user[0]->name;
            $cust[$keyc]['email']=$user[0]->email;
            $cust[$keyc]['phone']=$user[0]->phone;
            $cust[$keyc]['commands'] = app("App\Http\Controllers\CommandController")->getCommand($cust[$keyc]->id);
            if ($cust[$keyc]['commands']==0){
                $cust[$keyc]['commands']=null;
            }
        }
        return $cust;
    }
    public function resetPass(Request $requ){
        $emailcheck=DB::table('users')->where('email',$requ->email)->exists();
        if (!$emailcheck)
        {
            return array("success" => false, "code" => 900, "response" => "email doesin't exist");
        }

        else {
                $to_name = $requ->name;
                $rand=$this->randomString();
                $to_email = $requ->email;
                $data = array('rand' => $rand, "email" => $to_email);
                Mail::to($to_email)->send(new ResetPassword($data));


        }
        return array("success" => true, "code" => 200, "response" => $rand);
    }
}
