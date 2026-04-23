<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = [
        'banner_id',
        'title',
        'icon',
        'image',
    ];

    // Relationship: Card → belongs to Banner
    public function banner()
    {
        return $this->belongsTo(Banner::class);
    }
}
