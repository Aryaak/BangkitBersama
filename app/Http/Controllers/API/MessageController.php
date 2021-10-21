<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSend;
use App\Http\Controllers\Controller;
use App\Models\Message;

class MessageController extends Controller
{
    public function send()
    {
        $input = request()->all();

        Message::create($input);
        $data = $this->get($input['sender'], $input['recipient']);

        event(new MessageSend($data));

        return ResponseFormatter::success('Send Message Success!', $data);
    }

    public function get($sender, $recipient)
    {
        $data = Message::where(function ($query) use ($sender, $recipient) {
            $query->where('sender', $sender)->orWhere('sender', $recipient);
        })->where(function ($query) use ($sender, $recipient) {
            $query->where('recipient', $sender)->orWhere('recipient', $recipient);
        })->get();

        return ResponseFormatter::success('Get Message Success!', $data);
    }
}
