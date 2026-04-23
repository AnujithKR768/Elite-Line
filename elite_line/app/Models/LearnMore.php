<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LearnMore extends Model
{
    protected $table = 'learnmore';

    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'location',
        'phone',
        'email',
        'image'
    ];
}
