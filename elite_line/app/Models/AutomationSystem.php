<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AutomationSystem extends Model
{
     protected $fillable = [
        'title',
        'description',
        'points',
        'footer',
    ];

    protected $casts = [
        'points' => 'array', // store points as JSON
    ];
}
