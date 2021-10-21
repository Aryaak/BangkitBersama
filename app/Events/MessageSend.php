<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $messages;

    public function __construct($messages)
    {
        $this->messages = $messages;
    }

    public function broadcastOn()
    {
        return ['chat-room'];
    }

    public function broadcastAs()
    {
        return 'message-send';
    }
}
