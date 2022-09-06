<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeleteCommandProductToInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('information', function (Blueprint $table) {
            //$table->dropForeign(['product_id']);
            $table->dropForeign(['extra_option_id']);
            $table->dropForeign(['command_id']);
           // $table->dropForeign('command_lines_product_id_foreign');
            /*$table->dropForeign('command_lines_command_id_foreign');
            $table->dropForeign('products_extra_option_id_foreign');*/
            $table -> foreign('product_id') -> references('product_id') -> on('command_lines')->onDelete('cascade');
            $table -> foreign('extra_option_id') -> references('id') -> on('products')->onDelete('cascade');
            $table -> foreign('command_id') -> references('command_id') -> on('command_lines')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('information', function (Blueprint $table) {
            //
        });
    }
}
