<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender',
        'recipient',
        'message'
    ];

    public function sender_profile()
    {
        return $this->belongsTo(User::class, 'sender', 'id');
    }

    public function recipient_profile()
    {
        return $this->belongsTo(User::class, 'recipient', 'id');
    }
}
