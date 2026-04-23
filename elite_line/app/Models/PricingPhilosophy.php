<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPhilosophy extends Model
{

    protected $fillable = [
        'title',
        'description',
        'footer'
      ];

    public function points()
    {
        return $this->hasMany(PricingPoint::class)->orderBy('sort_order');
    }

}
