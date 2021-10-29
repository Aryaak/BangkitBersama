<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\ResponseFormatter;
use Validator;

class UserController extends Controller
{

    private function checkEmailExists($email)
    {
        return User::where('email', $email)->first();
    }

    private function checkUsernameExists($username)
    {
        return User::where('username', $username)->first();
    }

    public function register(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'username' => 'required',
            'address' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return ResponseFormatter::failed('User Registration Failed!', 401, $validator->errors());
        }

        if ($this->checkUsernameExists($input['username'])) {
            return ResponseFormatter::failed('User Username Already Exists!', 409, $validator->errors());
        }

        if ($this->checkEmailExists($input['email'])) {
            return ResponseFormatter::failed('User Email Already Exists!', 409, $validator->errors());
        }

        $input['password'] = bcrypt($input['password']);
        $input['photo'] = 'assets/photo/profile/default.jpg';
        $input['document'] = null;
        $input['user_status_id'] = 1;
        $user = User::create($input);
        $user['token'] =  $user->createToken('nApp')->accessToken;

        return ResponseFormatter::success('User Registration Success!', $user);
    }

    public function login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $user['token'] =  $user->createToken('nApp')->accessToken;
            if (request('device_token')) {
                User::where('id', $user->id)->update(['device_token' => request('device_token')]);
            }
            return ResponseFormatter::success('User Login Success!', $user);
        } else {
            return ResponseFormatter::failed('User Login Failed!', 401, ['Unauthorized']);
        }
    }

    public function profile()
    {
        $user = Auth::user();
        return ResponseFormatter::success('User Get Profile Success!', $user);
    }

    public function update()
    {
        $user = Auth::user();
        $query = User::where('id', $user->id);
        $input = request()->all();

        if (isset($input['document']) && $user->user_status_id != 3) {
            $input['user_status_id'] = 2;
        }

        $user = $query->update($input);
        $user =  $query->first();

        return ResponseFormatter::success('User Update Profile Success!', $user);
    }

    public function logout()
    {
        $user = Auth::user();

        User::where('id', $user->id)->update(['device_token' => null]);
        return ResponseFormatter::success('User Logout Success!', []);
    }
}