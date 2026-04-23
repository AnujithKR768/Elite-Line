<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'name',
        'company',
        'email',
        'phone',
        'location',
        'service_type',
        'product_type',
        'urgency',
        'project_details',
        'status',
        'admin_notes',
    ];
}
