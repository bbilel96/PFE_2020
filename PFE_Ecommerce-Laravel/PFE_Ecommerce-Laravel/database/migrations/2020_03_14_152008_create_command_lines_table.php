<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('command_lines', function (Blueprint $table) {
            $table->integer('quantity');
            $table->bigInteger('product_id')->unsigned()->index()->nullable();
            $table->bigInteger('command_id')->unsigned()->index()->nullable();
            $table->primary(['product_id','command_id']);
            $table -> foreign('command_id') -> references('id') -> on('commands');
            $table -> foreign('product_id') -> references('id') -> on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('command_lines');
    }
}
