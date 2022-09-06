<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInformationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('information', function (Blueprint $table) {
            $table->bigInteger('product_id')->unsigned()->index();
            $table->bigInteger('command_id')->unsigned()->index();
            $table->bigInteger('extra_option_id')->unsigned()->index();
            $table->primary(['product_id','command_id','extra_option_id']);
            $table->Integer('quantity')->unsigned();
            $table -> foreign('product_id') -> references('product_id') -> on('command_lines');
            $table -> foreign('extra_option_id') -> references('id') -> on('products');
            $table -> foreign('command_id') -> references('command_id') -> on('command_lines');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('informations');
    }
}
