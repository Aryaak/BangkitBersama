<?php

namespace App\Http\Controllers;

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
        $data_user = DB::table('users')
                    ->where('users.id', $id)->first();

        // dd($data_user);
        return view('pages.user.detail', [
            'user' => $data_user
        ]);
    }

    public function verified()
    {
        User::where('id', request('id'))->update([
            'user_status_id' => 3
        ]);
        Session::flash('message', 'Verification User Successfull');
        return redirect()->back();
    }

    public function unverified()
    {
        User::where('id', request('id'))->update([
            'user_status_id' => 1,
            'document' => null
        ]);
        Session::flash('message', 'Unverification User Successfull');
        return redirect()->back();
    }
}
