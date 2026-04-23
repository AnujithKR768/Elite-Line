<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QualityStandard extends Model
{
    protected $fillable = [
        'title',
        'description',
        'point',
    ];

    protected $casts = [
        'point' => 'array', // important
    ];
}
