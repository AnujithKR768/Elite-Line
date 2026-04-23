<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Philosophy extends Model
{
    protected $table = 'philosophy';

    protected $fillable = [
        'image',
        'title',
        'paragraph',
        'paragraph2',
    ];
}
