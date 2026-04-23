<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorePrinciplePoint extends Model
{
    protected $fillable = [
        'section_id',
        'point',
        'order'
        ];

    public function section()
    {
        return $this->belongsTo(CorePrincipleSection::class);
    }
}
