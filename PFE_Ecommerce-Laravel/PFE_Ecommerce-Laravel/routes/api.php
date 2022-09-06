<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::post('sendMail','UserController@sendMail');

Route::get('getAll','FamilyController@getFamily');
Route::get('getRestaurant','RestaurantController@getResturant');
Route::get('getCommand/{id}','CommandController@getCommand');
Route::post('command','CommandController@create');
Route::post('user','UserController@create');
Route::put('changeState','CustomerController@updateState');
Route::get('users','UserController@getAll');
Route::post('getbyEmail','UserController@getEmail');
Route::post('checkEmail','UserController@checkEmail');
Route::put('resetPassword','UserController@resetPassword');
Route::get('get','FamilyController@getAll');
Route::delete('deleteCommand/{id}','CommandController@destroy');
Route::get('getCustomers','CustomerController@getAll');
Route::put('updateAccount','UserController@updateAccount');
Route::post('checkEmailForUp','UserController@checkEmailForUp');
Route::post('checkEmailRes','UserController@resetPass');
Route::get('getPublicity','PublicityController@getAll');
Route::put('updateLongAtt','CustomerController@updateLongAtt');
Route::post('addProd','ProductController@store');
Route::post('addImage','ProductController@storeImage');
Route::post('addExtra/{id}','ProductController@addExtra');
Route::put('addPos','CustomerController@addPos');


