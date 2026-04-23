<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPoint extends Model
{
    protected $fillable = [
        'pricing_philosophy_id',
        'point',
        'sort_order'
    ];

    public function philosophy()
    {
        return $this->belongsTo(PricingPhilosophy::class);
    }
}
