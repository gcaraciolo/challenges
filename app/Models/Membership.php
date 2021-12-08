<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;

    public function resources()
    {
        if ($this->attributes['total_access']) {
            return $this->hasMany(Resource::class, 'account_id', 'account_id');
        }

        return $this->belongsToMany(Resource::class, 'membership_available_resources');
    }
}
