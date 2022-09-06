<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use App\Images;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->sendMailWhenUserOrderProduct('example@gmail.com');
    }
    public function addExtra($id,Request $requ){
        $prod=new Product();
        $prod->name=$requ->name;
        $prod->type=$requ->type;
        $prod->order_app=1;
        $prod->price=$requ->price;
        $prod->save();

        $last2 = Product::find(Product::max('id'));
        $product=Product :: find($id);
        $product->ExtraCharge()->attach($last2->id);



    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $prod= new Product();
        $prod->name=$request->name;
        $prod->designation=$request->designation;
        $prod->order_app=1;
        $prod->type='product';
        $prod->price=$request->price;
        $prod->family_id=$request->family_id;
        $prod->save();
    }
    public function storeImage(Request $request){
        if ($request->hasFile('image')) {
            $request->validate([

                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

            ]);
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $picture = date('His') . '-' . $filename.'.png';
            $file->move(public_path('img'), $picture);
            $last2 = Product::find(Product::max('id'));
            $last2->product_image='img/'.$picture;
            $last2->save();
            return response()->json(["message" => "Image Uploaded Succesfully"]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }

    public function sendMailWhenUserOrderProduct($email)
    {
        App\Mail\OrderProductMail::send($email);
    }
}
