<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeleteCommandToLinecommandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('command_lines', function (Blueprint $table) {
           // $table->dropForeign('command_lines_command_id_foreign');
            $table -> foreign('command_id') -> references('id') -> on('commands')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('command_lines', function (Blueprint $table) {
            //
        });
    }
}
