<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('office');
            $table->string('address');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('email_secondary')->nullable();
            $table->string('website')->nullable();
            $table->string('map_embed')->nullable(); // Google map iframe
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
