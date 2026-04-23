<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use App\Models\Brand;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
         Inertia::share([
        'whatsapp' => [
            'number' => env('WHATSAPP_NUMBER'),
            'message' => env('WHATSAPP_MESSAGE'),
        ],
        'phone' => [
            'number' => env('PHONE_NUMBER'),
        ],
    ]);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
         Inertia::share([
        'brands' => function () {
            return Brand::orderBy('id', 'asc')->get();
        },
    ]);
    }
}
