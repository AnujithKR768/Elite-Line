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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();

            // Client Info
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone');

            // Project Info
            $table->string('location')->nullable();
            $table->string('service_type')->nullable();
            $table->string('product_type')->nullable();
            $table->string('urgency')->nullable();

            // Details
            $table->text('project_details');

            // Business Control
            $table->string('status')->default('new');
            $table->text('admin_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
