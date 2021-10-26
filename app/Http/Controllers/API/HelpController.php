<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Help;
use App\Models\HelpRequest;
use App\Models\HelpReview;
use Illuminate\Support\Facades\Auth;
use Validator;

class HelpController extends Controller
{
    private function reduceQuota($help_id)
    {
        $query = Help::where('id', $help_id);
        $help = $query->first();
        $quota = $help->quota - 1;

        $query->update(['quota' => $quota]);
        $help = $query->first();

        if ($help->quota == 0) {
            $query->update(['help_status_id' => 4]);
        }
    }

    private function checkExpiredDate($help_id)
    {
        $query = Help::where('id', $help_id);
        $help = $query->first();
        $now = date('Y-m-d');
        $expired = $now >= $help->end_date;

        if ($expired) {
            $query->update(['help_status_id' => 4]);
        }
    }

    public function store()
    {
        $input = request()->all();

        $validator = Validator::make($input, [
            'help_category_id' => 'required',
            'photo' => 'required',
            'name' => 'required',
            'description' => 'required',
            'quota' => 'required',
            'end_date' => 'required',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::failed('Create New Help Failed!', 401, $validator->errors());
        }

        $user = Auth::user();
        $input['user_id'] = $user->id;
        $data = Help::create($input);

        return ResponseFormatter::success('Create New Help Success!', $data);
    }

    public function getAll()
    {
        $data = Help::with('user', 'category', 'status')->where('help_status_id', 2)->orWhere('help_status_id', 4)->get();
        $user = Auth::user();

        foreach ($data as $d) {
            $d['isInisiator'] = ($user->id == $d->user->id) ? true : false;
            $this->checkExpiredDate($d['id']);
        }
        return ResponseFormatter::success('Get Help For Home Success!', $data);
    }

    public function getByInisiator()
    {
        $user = Auth::user();

        $data = Help::where('user_id', $user->id)->get();

        return ResponseFormatter::success('Get Help By Inisiator Success!', $data);
    }

    public function getDetail($id)
    {
        $data = Help::where('id', $id)->with('user', 'category', 'status', 'requests.user', 'reviews.user')->first();

        $user = Auth::user();

        if ($user->id != $data->user->id) {
            $data['my-request'] = HelpRequest::where('user_id', $user->id)->where('help_id', $id)->orderBy('id', 'DESC')->first();
        }
        $data['isInisiator'] = ($user->id == $data->user->id) ? true : false;

        $data['my-review'] = HelpReview::where('user_id', $user->id)->where('help_id', $id)->orderBy('id', 'DESC')->with('user')->first();


        foreach ($data['reviews'] as $key => $value) {
            if ($value['user']['id'] == $user->id) {
                unset($data['reviews'][$key]);
            }
        }

        $this->checkExpiredDate($data->id);

        return ResponseFormatter::success('Get Help Detail Inisiator Success!', $data);
    }

    public function getForHome()
    {
        $data = Help::with('user', 'category', 'status')->where('help_status_id', 2)->orWhere('help_status_id', 4)->limit(5)->get();
        $user = Auth::user();

        foreach ($data as $d) {
            $d['isInisiator'] = ($user->id == $d->user->id) ? true : false;
            $this->checkExpiredDate($d['id']);
        }
        return ResponseFormatter::success('Get Help For Home Success!', $data);
    }

    public function sendRequest()
    {
        $input = request()->all();
        $user = Auth::user();
        $input['user_id'] = $user->id;

        $data = HelpRequest::create($input);
        return ResponseFormatter::success('Send Request Success!', $data);
    }

    public function sendReview()
    {
        $input = request()->all();
        $user = Auth::user();
        $input['user_id'] = $user->id;

        $data = HelpReview::create($input);
        return ResponseFormatter::success('Send Review Success!', $data);
    }

    public function updateRequest()
    {
        $input = request()->all();

        $data = HelpRequest::where('id', $input['id'])->update($input);
        return ResponseFormatter::success('Update Request Success!', $data);
    }

    public function deleteRequest()
    {
        $input = request()->all();

        $data = HelpRequest::where('id', $input['id'])->delete();
        return ResponseFormatter::success('Delete Request Success!', $data);
    }


    public function updateReview()
    {
        $input = request()->all();

        $data = HelpReview::where('id', $input['id'])->update($input);
        return ResponseFormatter::success('Update Review Success!', $data);
    }

    public function deleteReview()
    {
        $input = request()->all();

        $data = HelpReview::where('id', $input['id'])->delete();
        return ResponseFormatter::success('Delete Review Success!', $data);
    }

    public function acceptedRequest()
    {
        $input = request()->all();

        HelpRequest::where('id', $input['help_request_id'])->update(['help_request_status_id' => 2]);
        $this->reduceQuota($input['help_id']);

        return ResponseFormatter::success('Accepted Help Request Success!', []);
    }
}
