<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngineeringPoint extends Model
{
    protected $fillable = [
        'section_id',
        'point',
        'order'
        ];

    public function section()
    {
        return $this->belongsTo(EngineeringSection::class);
    }
}
