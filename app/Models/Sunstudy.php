<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sunstudy extends Model
{
    use HasFactory;

    protected $with = [
        'images'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'time_per_image',
        'start_time',
        'sun_based_on_date'
    ];

    public function images() {
        return $this->hasMany(Image::class);
    }
}
