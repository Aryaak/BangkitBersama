<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSend;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\API\FCMController;

class MessageController extends Controller
{
    public function send()
    {
        $input = request()->all();

        Message::create($input);
        $data = $this->get($input['sender'], $input['recipient']);

        $recipient = User::where('id', $input['recipient'])->first();
        $sender = User::where('id', $input['sender'])->first();

        FCMController::send($recipient->device_token, 'Pesan baru dari ' . $sender->name, $input['message']);

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

    public function incoming()
    {
        $user = Auth::user();

        $messages = Message::where('sender', $user->id)->orWhere('recipient', $user->id)->with('sender_profile', 'recipient_profile')->get();

        $contacts = [];

        foreach ($messages as $message) {
            if ($message->sender == $user->id) {
                $contacts[] = $message->recipient_profile;
            }


            if ($message->recipient == $user->id) {
                $contacts[] = $message->sender_profile;
            }
        }

        $contacts =  array_unique($contacts);

        $filter_contacts = [];

        foreach ($contacts as $key => $value) {
            $filter_contacts[] = $value;
        }

        foreach ($filter_contacts as $fc) {
            $sender = $user->id;
            $recipient = $fc->id;
            $fc['last_message'] = Message::where(function ($query) use ($sender, $recipient) {
                $query->where('sender', $sender)->orWhere('sender', $recipient);
            })->where(function ($query) use ($sender, $recipient) {
                $query->where('recipient', $sender)->orWhere('recipient', $recipient);
            })->orderBy('id', 'DESC')->first();
        }


        return ResponseFormatter::success('Get Incoming Message Success!', $filter_contacts);
    }

    public function read()
    {
        $sender = request('sender');
        $recipient = request('recipient');
        $data = Message::where(function ($query) use ($sender, $recipient) {
            $query->where('sender', $sender)->orWhere('sender', $recipient);
        })->where(function ($query) use ($sender, $recipient) {
            $query->where('recipient', $sender)->orWhere('recipient', $recipient);
        })->update(['read' => true]);

        return ResponseFormatter::success('Read Message Success!', $data);
    }
}
