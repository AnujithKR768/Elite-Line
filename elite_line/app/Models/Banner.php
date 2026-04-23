<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
   protected $fillable = [
        'title',
        'image',
    ];

    // Relationship: One Banner → Many Cards
    public function cards()
    {
        return $this->hasMany(Cards::class);
    }
}
