<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionVision extends Model
{
    protected $fillable = [
        'type',
        'title',
        'description',
        'image',
        'is_active'
    ];
}
