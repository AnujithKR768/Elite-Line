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


        Schema::create('engineering_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // CUSTOM ENGINEERING SOLUTIONS
            $table->text('description')->nullable(); // paragraph
            $table->timestamps();
        });

    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('engineering_sections');
    }
};
