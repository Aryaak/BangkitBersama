<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\FCMController;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::where('role_id', '!=', 1)->get();
        return view('pages.user.index', [
            'users' => $user
        ]);
    }

    public function detail($id)
    {
        $data_user = User::where('users.id', $id)->first();

        // dd($data_user);
        return view('pages.user.detail', [
            'user' => $data_user
        ]);
    }

    public function verified()
    {
        $query = User::where('id', request('id'));
        $query->update([
            'user_status_id' => 3
        ]);
        $user = $query->first();
        Session::flash('message', 'Verification User Successfull');
        FCMController::send($user->device_token, 'Verifikasi Profile Berhasil', 'Kini anda dapat memebuat atau meminta bantuan.');
        return redirect()->back();
    }

    public function unverified()
    {
        $query = User::where('id', request('id'));
        $query->update([
            'user_status_id' => 4,
            'rejected_reason' => request('rejected_reason'),
            'document' => null
        ]);
        $user = $query->first();
        Session::flash('message', 'Unverification User Successfull');
        FCMController::send($user->device_token, 'Verifikasi Profile Ditolak', 'Lakukan verifikasi ulang.');
        return redirect()->back();
    }
}
