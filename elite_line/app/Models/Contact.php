<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
    'company_name',
    'office',
    'address',
    'phone',
    'email',
    'email_secondary',
    'website',
    'map_embed',
    ];
}
