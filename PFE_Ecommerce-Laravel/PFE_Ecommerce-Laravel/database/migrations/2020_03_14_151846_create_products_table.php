<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->bigInteger('family_id')->unsigned()->index()->nullable();
            $table->string('name',50);
            $table->string('designation')->nullable();
            $table->integer('order_app');
            $table->string('type',10);
            $table->double('price',10,5)->unsigned()->nullable();
            $table->string('product_image')->nullable();
            $table -> foreign('family_id') -> references('id') -> on('families')->onDelete('cascade');;


        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
