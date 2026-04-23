<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorePrincipleSection extends Model
{
    protected $fillable = [
        'title',
        'description'
        ];

    public function points()
    {
        return $this->hasMany(CorePrinciplePoint::class, 'section_id')->orderBy('order');
    }
}
