<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'memberships');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }
}
