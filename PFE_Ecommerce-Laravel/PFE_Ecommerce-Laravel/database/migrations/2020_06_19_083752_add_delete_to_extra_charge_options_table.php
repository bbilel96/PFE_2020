<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeleteToExtraChargeOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('extra_charges_options', function (Blueprint $table) {
            $table->dropForeign('extra_charges_options_product_id_foreign');
            $table->dropForeign('extra_charges_options_extra_option_id_foreign');
            $table -> foreign('product_id') -> references('id') -> on('products')->onDelete('cascade');
            $table -> foreign('extra_option_id') -> references('id') -> on('products') ->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('extra_charges_options', function (Blueprint $table) {
            //
        });
    }
}
