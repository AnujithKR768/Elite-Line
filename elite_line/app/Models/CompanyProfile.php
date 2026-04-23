<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    protected $fillable = [
        'company_name',
        'intro',
        'expertise',
        'description',
        'image',
    ];

    protected $casts = [
        'expertise' => 'array',
    ];
}
