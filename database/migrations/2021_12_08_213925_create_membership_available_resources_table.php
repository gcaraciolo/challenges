<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembershipAvailableResourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membership_available_resources', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('membership_id')->constrained()->restrictOnDelete()->restrictOnUpdate();
            $table->foreignId('resource_id')->constrained()->restrictOnDelete()->restrictOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('membership_available_resources');
    }
}
