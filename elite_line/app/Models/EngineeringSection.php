<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngineeringSection extends Model
{
    protected $fillable = [
        'title',
        'description'
        ];

    public function points()
    {
        return $this->hasMany(EngineeringPoint::class, 'section_id')
            ->orderBy('order');
    }
}
