<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\ResponseFormatter;
use App\Models\PakarProfile;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use App\Events\SetStatus;
use App\Models\SubRole;
use App\Models\UserFile;

class UserController extends Controller
{
    // Superadmin Auth

    public function superadminRegister(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'email_recovery' => 'required|email',
            'password' => 'required',
            'password_confirmation' => 'required_with:password|same:password'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        $check = User::where('email', $input['email'])->first();
        if ($check) {
            return ResponseFormatter::failed("Email already exists!");
        }
        $input['role_id'] = 1;
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        // $user['user_id'] = $user['uuid'];
        $user['token'] =  $user->createToken('nApp')->accessToken;
        $data = $user;

        return ResponseFormatter::success("Super Admin Registration Successful!", $data);
    }

    public function superadminLogin()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            if ($user->role_id != 1) {
                return ResponseFormatter::failed("Super admin email has been registered in another user");
            }
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Super Admin Login Successful!", $user);
        } else {
            return ResponseFormatter::failed("Super Admin is not Registered!");
        }
    }

    // Customer Auth

    public function customerRegisterByGmail(Request $request)
    {
        $input = $request->all();

        $check = User::where('email', $input['email'])->first();
        if ($check) {
            return ResponseFormatter::failed("Customer email has been registered, please login!");
        } else {
            $user = User::create([
                'role_id' => 2,
                'email' => $input['email']
            ]);
            $user['profile'] = Profile::create([
                'user_uuid' => $user->uuid,
                'name' => $input['name'],
                'gender' => $input['gender'],
                'photo' => 'assets/photo/profile/customer-default.jpg',
                'address' => json_encode($input['address']),
                'birth' => $input['birth'],
                'nik' => null,
                'document' => null
            ]);

            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Customer Registration Successful!", $user);
        }
    }

    public function customerLoginByGmail(Request $request)
    {
        $input = $request->all();
        $user = User::where('email', $input['email'])->first();
        if ($user) {
            if ($user->role_id != 2) {
                return ResponseFormatter::failed("Customer email has been registered in another user");
            }
            $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $user['token'] =  $user->createToken('nApp')->accessToken;
            $user['profile']['address'] = json_decode($user['profile']['address']);
            return ResponseFormatter::success("Customer Login Successful!", $user);
        } else {
            return ResponseFormatter::failed("Customer email has not been registered, please register!");
        }
    }

    public function customerRegister(Request $request)
    {
        $input = $request->all();
        $input['role_id'] = 2;

        $validation['name'] = 'required';
        $validation['birth'] = 'required';
        $validation['gender'] = 'required';
        $validation['address'] = 'required';

        if (isset($request->email)) {
            $validation['email'] = 'required|email';
            $validation['email_recovery'] = 'required|email';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else if (isset($request->phone_number)) {
            $validation['phone_number'] = 'required|min:11';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else {
            $validation['email'] = 'required|email';
            $validation['phone_number'] = 'required|min:11';
        }

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (isset($request->email)) {
            $check = User::where('email', $input['email'])->first();
            if ($check) {
                return ResponseFormatter::failed("Email already exists!");
            }
            $input['email_recovery'] = request('email_recovery');
        } else {
            $check = User::where('phone_number', $input['phone_number'])->first();
            if ($check) {
                return ResponseFormatter::failed("Phone number already exists!");
            }
        }

        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);
        $user['profile'] = Profile::create([
            'user_uuid' => $user->uuid,
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'photo' => 'assets/photo/profile/customer-default.jpg',
            'birth' => $input['birth'],
            'nik' => null,
            'document' => null
        ]);
        $user['profile']['address'] = json_decode($user['profile']['address']);
        $user['token'] =  $user->createToken('nApp')->accessToken;

        if (isset($request->email)) {
            OTPController::sendOTP($user, 'email');
        } else {
            OTPController::sendOTP($user, 'sms');
        }


        return ResponseFormatter::success("Customer Registration Successful!", $user);
    }

    public function customerLogin()
    {

        if (request('email')) {
            if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
                $user = Auth::user();
                if ($user->role_id != 2) {
                    return ResponseFormatter::failed("Customer email has been registered in another user");
                }
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                return ResponseFormatter::success("Customer Login Successful!", $user);
            }
        } else if (request('phone_number')) {
            $user = User::where('phone_number', request('phone_number'))->first();
            if ($user && password_verify(request('password'), $user->password)) {
                if ($user->role_id != 2) {
                    return ResponseFormatter::failed("Customer phone number has been registered in another user");
                }
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                return ResponseFormatter::success("Customer Login Successful!", $user);
            }
        }
        return ResponseFormatter::failed("Customer is not Registered!");
    }

    public function customerUpdateProfile(Request $request)
    {
        $input = $request->all();
        $user = Auth::user();
        Profile::where('user_uuid', $user->uuid)->update([
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'birth' => $input['birth'],
            'nik' => $input['nik'],
            'photo' => $input['photo']
        ]);
        $user['profile'] =  Profile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] =  json_decode($user['profile']['address']);
        if ($user) {
            return ResponseFormatter::success("Update Profile Customer Successful!", $user);
        }
        return ResponseFormatter::failed("Update Profile Customer Failed!");
    }

    // Pakar Auth

    public function pakarRegisterByGmail(Request $request)
    {
        $input = $request->all();

        $check = User::where('email', $input['email'])->first();
        if ($check) {
            return ResponseFormatter::failed("Pakar email has been registered, please login!");
        } else {
            $user = User::create([
                'role_id' => 3,
                'sub_role_id' => $input['pakar'],
                'email' => $input['email']
            ]);
            $user['profile'] = Profile::create([
                'user_uuid' => $user->uuid,
                'name' => $input['name'],
                'gender' => $input['gender'],
                'address' => json_encode($input['address']),
                'photo' => 'assets/photo/profile/pakar-default.jpg',
                'birth' => $input['birth']
            ]);
            $user['pakar_profile'] = PakarProfile::create([
                'user_uuid' => $user->uuid
            ]);
            $user['document'] = UserFile::create([
                'user_uuid' => $user->uuid
            ]);
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;

            return ResponseFormatter::success("Pakar Registration Successful!", $user);
        }
    }

    public function pakarLoginByGmail(Request $request)
    {
        $input = $request->all();
        $user = User::where('email', $input['email'])->first();
        if ($user) {
            if ($user->role_id != 3) {
                return ResponseFormatter::failed("Pakar email has been registered in another user");
            }
            $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Pakar Login Successful!", $user);
        } else {
            return ResponseFormatter::failed("Pakar email has not been registered, please register!");
        }
    }

    public function pakarRegister(Request $request)
    {
        $input = $request->all();
        $input['role_id'] = 3;
        $input['sub_role_id'] = $request->pakar;
        if (isset($request->email)) {
            $validation['email'] = 'required|email';
            $validation['email_recovery'] = 'required|email';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else if (isset($request->phone_number)) {
            $validation['phone_number'] = 'required|min:11';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else {
            $validation['email'] = 'required|email';
            $validation['phone_number'] = 'required|min:11';
        }

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (isset($request->email)) {
            $check = User::where('email', $input['email'])->first();
            if ($check) {
                return ResponseFormatter::failed("Email already exists!");
            }
            $input['phone_number'] = null;
            $input['email_recovery'] = request('email_recovery');
        } else {
            $check = User::where('phone_number', $input['phone_number'])->first();
            if ($check) {
                return ResponseFormatter::failed("Phone number already exists!");
            }
            $input['email'] = null;
            $input['email_recovery'] = null;
        }

        $input['password'] = bcrypt($input['password']);

        $user = User::create([
            'role_id' => $input['role_id'],
            'sub_role_id' => $input['sub_role_id'],
            'email' => $input['email'],
            'email_recovery' => $input['email_recovery'],
            'password' => $input['password'],
            'phone_number' => $input['phone_number']
        ]);
        $user['profile'] = Profile::create([
            'user_uuid' => $user->uuid,
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'photo' => 'assets/photo/profile/pakar-default.jpg',
            'birth' => $input['birth']
        ]);
        $user['pakar_profile'] = PakarProfile::create([
            'user_uuid' => $user->uuid,
            'education' => $input['education']
        ]);
        $user['document'] = UserFile::create([
            'user_uuid' => $user->uuid
        ]);
        $user['profile']['address'] = json_decode($user['profile']['address']);
        $user['token'] =  $user->createToken('nApp')->accessToken;

        if (isset($request->email)) {
            OTPController::sendOTP($user, 'email');
        } else {
            OTPController::sendOTP($user, 'sms');
        }

        return ResponseFormatter::success("Pakar Registration Successful!", $user);
    }

    public function pakarLogin()
    {

        if (request('email')) {
            if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
                $user = Auth::user();
                if ($user->role_id != 3) {
                    return ResponseFormatter::failed("Pakar email has been registered in another user");
                }
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['pakar_profile'] = PakarProfile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                return ResponseFormatter::success("Pakar Login Successful!", $user);
            }
        } else if (request('phone_number')) {
            $user = User::where('phone_number', request('phone_number'))->first();
            if ($user && password_verify(request('password'), $user->password)) {
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['pakar_profile'] = PakarProfile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                if ($user->role_id != 3) {
                    return ResponseFormatter::failed("Pakar phone number has been registered in another user");
                }
                return ResponseFormatter::success("Pakar Login Successful!", $user);
            }
        }
        return ResponseFormatter::failed("Pakar is not Registered!");
    }

    public function pakarUpdateProfile(Request $request)
    {
        $input = $request->except('file');
        $file = $request->file;
        $user = Auth::user();
        Profile::where('user_uuid', $user->uuid)->update([
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'birth' => $input['birth'],
            'photo' => $input['photo']
        ]);
        PakarProfile::where('user_uuid', $user->uuid)->update([
            'education' =>  $input['education']
        ]);
        if (isset($file)) {
            UserFile::where('user_uuid', $user->uuid)->update($file);
        }
        $user['profile'] =  Profile::where('user_uuid', $user->uuid)->first();
        $user['pakar_profile'] =  PakarProfile::where('user_uuid', $user->uuid)->first();
        $user['document'] =  UserFile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] =  json_decode($user['profile']['address']);
        if ($user) {
            return ResponseFormatter::success("Update Profile Pakar Successful!", $user);
        }
        return ResponseFormatter::failed("Update Profile Pakar Failed!");
    }


    // Posyandu Auth

    public function posyanduRegisterByGmail(Request $request)
    {
        $input = $request->all();

        $check = User::where('email', $input['email'])->first();

        if ($check) {
            return ResponseFormatter::failed("Posyandu email has been registered, please login!");
        } else {
            $user = User::create([
                'role_id' => 4,
                'email' => $input['email']
            ]);
            $user['profile'] = Profile::create([
                'user_uuid' => $user->uuid,
                'name' => $input['name'],
                'gender' => null,
                'address' => json_encode($input['address']),
                'birth' => null,
                'nik' => null,
                'document' => null
            ]);
            $user['document'] = UserFile::create([
                'user_uuid' => $user->uuid
            ]);
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Posyandu Registration Successful!", $user);
        }
    }

    public function posyanduLoginByGmail(Request $request)
    {
        $input = $request->all();
        $user = User::where('email', $input['email'])->first();
        if ($user) {
            if ($user->role_id != 4) {
                return ResponseFormatter::failed("Posyandu email has been registered in another user");
            }
            $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Posyandu Login Successful!", $user);
        } else {
            return ResponseFormatter::failed("Posyandu email has not been registered, please register!");
        }
    }

    public function posyanduRegister(Request $request)
    {
        $input = $request->all();
        $input['role_id'] = 4;
        if (isset($request->email)) {
            $check = User::where('email', $input['email'])->first();
            if ($check) {
                return ResponseFormatter::failed("Email already exists!");
            }
            $validation['email'] = 'required|email';
            $validation['email_recovery'] = 'required|email';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else if (isset($request->phone_number)) {
            $check = User::where('phone_number', $input['phone_number'])->first();
            if ($check) {
                return ResponseFormatter::failed("Phone number already exists!");
            }
            $validation['phone_number'] = 'required|min:11';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else {
            $validation['email'] = 'required|email';
            $validation['phone_number'] = 'required|min:11';
        }

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (isset($request->email)) {
            $input['phone_number'] = null;
            $input['email_recovery'] = request('email_recovery');
        } else {
            $input['email'] = null;
            $input['email_recovery'] = null;
        }

        $input['password'] = bcrypt($input['password']);

        $user = User::create([
            'role_id' => $input['role_id'],
            'email' => $input['email'],
            'email_recovery' => $input['email_recovery'],
            'password' => $input['password'],
            'phone_number' => $input['phone_number']
        ]);
        $user['profile'] = Profile::create([
            'user_uuid' => $user->uuid,
            'name' => $input['name'],
            'address' => json_encode($input['address']),
            'document' => null
        ]);
        $user['document'] = UserFile::create([
            'user_uuid' => $user->uuid
        ]);
        $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] = json_decode($user['profile']['address']);
        $user['token'] =  $user->createToken('nApp')->accessToken;

        if (isset($request->email)) {
            OTPController::sendOTP($user, 'email');
        } else {
            OTPController::sendOTP($user, 'sms');
        }

        return ResponseFormatter::success("Posyandu Registration Successful!", $user);
    }

    public function posyanduLogin()
    {

        if (request('email')) {
            if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
                $user = Auth::user();
                if ($user->role_id != 4) {
                    return ResponseFormatter::failed("Posyandu email has been registered in another user");
                }
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                return ResponseFormatter::success("Posyandu Login Successful!", $user);
            }
        } else if (request('phone_number')) {
            $user = User::where('phone_number', request('phone_number'))->first();
            if ($user && password_verify(request('password'), $user->password)) {
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                if ($user->role_id != 4) {
                    return ResponseFormatter::failed("Posyandu phone number has been registered in another user");
                }
                return ResponseFormatter::success("Posyandu Login Successful!", $user);
            }
        }
        return ResponseFormatter::failed("Posyandu is not Registered!");
    }

    public function posyanduUpdateProfile(Request $request)
    {
        $input = $request->except('file');
        $file = $request->file;
        $user = Auth::user();
        Profile::where('user_uuid', $user->uuid)->update([
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'photo' => $input['photo']
        ]);
        if (isset($file)) {
            UserFile::where('user_uuid', $user->uuid)->update($file);
        }
        $user['profile'] =  Profile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] =  json_decode($user['profile']['address']);
        $user['document'] =  UserFile::where('user_uuid', $user->uuid)->first();
        if ($user) {
            return ResponseFormatter::success("Update Profile Posyandu Successful!", $user);
        }
        return ResponseFormatter::failed("Update Profile Posyandu Failed!");
    }

    // Home Baby SPA Auth

    public function hbsRegisterByGmail(Request $request)
    {
        $input = $request->all();

        $check = User::where('email', $input['email'])->first();
        if ($check) {
            return ResponseFormatter::failed("Home Baby SPA email has been registered, please login!");
        } else {
            $user = User::create([
                'role_id' => 5,
                'email' => $input['email']
            ]);
            $user['profile'] = Profile::create([
                'user_uuid' => $user->uuid,
                'name' => $input['name'],
                'gender' => null,
                'address' => json_encode($input['address']),
                'birth' => null,
                'nik' => null,
                'document' => null
            ]);
            $user['document'] = UserFile::create([
                'user_uuid' => $user->uuid
            ]);
            $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;

            return ResponseFormatter::success("Home Baby SPA Registration Successful!", $user);
        }
    }

    public function hbsLoginByGmail(Request $request)
    {
        $input = $request->all();
        $user = User::where('email', $input['email'])->first();
        if ($user) {
            if ($user->role_id != 5) {
                return ResponseFormatter::failed("Home Baby SPA email has been registered in another user");
            }
            $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $user['profile']['address'] = json_decode($user['profile']['address']);
            $user['token'] =  $user->createToken('nApp')->accessToken;
            return ResponseFormatter::success("Home Baby SPA Login Successful!", $user);
        } else {
            return ResponseFormatter::failed("Home Baby SPA email has not been registered, please register!");
        }
    }

    public function hbsRegister(Request $request)
    {
        $input = $request->all();
        $input['role_id'] = 5;
        if (isset($request->email)) {
            $check = User::where('email', $input['email'])->first();
            if ($check) {
                return ResponseFormatter::failed("Email already exists!");
            }
            $validation['email'] = 'required|email';
            $validation['email_recovery'] = 'required|email';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else if (isset($request->phone_number)) {
            $check = User::where('phone_number', $input['phone_number'])->first();
            if ($check) {
                return ResponseFormatter::failed("Phone number already exists!");
            }
            $validation['phone_number'] = 'required|min:11';
            $validation['password'] = 'required|min:5';
            $validation['password_confirmation'] = 'required_with:password|same:password';
        } else {
            $validation['email'] = 'required|email';
            $validation['phone_number'] = 'required|min:11';
        }

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if (isset($request->email)) {
            $input['phone_number'] = null;
            $input['email_recovery'] = request('email_recovery');
        } else {
            $input['email'] = null;
            $input['email_recovery'] = null;
        }

        $input['password'] = bcrypt($input['password']);

        $user = User::create([
            'role_id' => $input['role_id'],
            'email' => $input['email'],
            'email_recovery' => $input['email_recovery'],
            'password' => $input['password'],
            'phone_number' => $input['phone_number']
        ]);
        $user['profile'] = Profile::create([
            'user_uuid' => $user->uuid,
            'name' => $input['name'],
            'address' => json_encode($input['address']),
            'document' => null
        ]);
        $user['document'] = UserFile::create([
            'user_uuid' => $user->uuid
        ]);
        $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] = json_decode($user['profile']['address']);
        $user['token'] =  $user->createToken('nApp')->accessToken;

        if (isset($request->email)) {
            OTPController::sendOTP($user, 'email');
        } else {
            OTPController::sendOTP($user, 'sms');
        }

        return ResponseFormatter::success("Home Baby Spa Registration Successful!", $user);
    }

    public function hbsLogin()
    {
        if (request('email')) {
            if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
                $user = Auth::user();
                if ($user->role_id != 5) {
                    return ResponseFormatter::failed("Home Baby SPA email has been registered in another user");
                }
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                return ResponseFormatter::success("hbs Login Successful!", $user);
            }
        } else if (request('phone_number')) {
            $user = User::where('phone_number', request('phone_number'))->first();
            if ($user && password_verify(request('password'), $user->password)) {
                $user['profile'] = Profile::where('user_uuid', $user->uuid)->first();
                $user['profile']['address'] = json_decode($user['profile']['address']);
                $user['token'] =  $user->createToken('nApp')->accessToken;
                if ($user->role_id != 5) {
                    return ResponseFormatter::failed("Home Baby SPA phone number has been registered in another user");
                }
                return ResponseFormatter::success("Home Baby Spa Login Successful!", $user);
            }
        }
        return ResponseFormatter::failed("Home Baby Spa is not Registered!");
    }

    public function hbsUpdateProfile(Request $request)
    {
        $input = $request->except('file');
        $file = $request->file;
        $user = Auth::user();
        Profile::where('user_uuid', $user->uuid)->update([
            'name' => $input['name'],
            'gender' => $input['gender'],
            'address' => json_encode($input['address']),
            'photo' => $input['photo']
        ]);
        if (isset($file)) {
            UserFile::where('user_uuid', $user->uuid)->update($file);
        }
        $user['profile'] =  Profile::where('user_uuid', $user->uuid)->first();
        $user['document'] =  UserFile::where('user_uuid', $user->uuid)->first();
        $user['profile']['address'] =  json_decode($user['profile']['address']);
        if ($user) {
            return ResponseFormatter::success("Update Profile Home Baby Spa Successful!", $user);
        }
        return ResponseFormatter::failed("Update Profile Home Baby Spa Failed!");
    }

    // Profile & Verification & Logout for all role

    public function superadminVerification(Request $request)
    {
        $input = $request->all();
        $user = Auth::user();
        if ($user->role_id != 1) {
            return ResponseFormatter::failed("User Verification Can Only be Accessed by Superadmin!");
        }
        $data = User::where('user_uuid', $input['user_uuid'])->update([
            'superadmin_verified' => true
        ]);
        if ($data) {
            return ResponseFormatter::success("User Verification Successful!", []);
        }
        return ResponseFormatter::failed("User Verification Failed!");
    }

    public function OTPverification(Request $request)
    {

        if (isset($request->email)) {
            $result =  OTPController::verification($request, 'email');
        } else {
            $result = OTPController::verification($request, 'sms');
        }
        if ($result['status']) {
            return ResponseFormatter::success($result['message'], []);
        } else {
            return ResponseFormatter::failed($result['message']);
        }
    }

    public function profile()
    {
        if ($user = Auth::user()) {
            $data = $user;
            $data['profile'] = Profile::where('user_uuid', $user->uuid)->first();
            $data['profile']['address'] = json_decode($data['profile']['address']);

            if ($user->role_id == 3) {
                $data['pakar_profile'] = PakarProfile::where('user_uuid', $user->uuid)->first();
                $data['pakar'] = SubRole::where('id', $user->sub_role_id)->first();
                $data['document'] = UserFile::where('user_uuid', $user->uuid)->first();
            }

            return ResponseFormatter::success("Get User Profile Successful!", $data);
        } else {
            return ResponseFormatter::failed("Get User Profile Failed!");
        }
    }

    public function logout(Request $request)
    {
        $logout = $request->user()->token()->revoke();
        if ($logout) {
            return  ResponseFormatter::success("User Logout Successful!", []);
        }
    }

    public function resetPassword(Request $request)
    {
        $input = $request->all();
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required',
            'new_password_confirmation' => 'required_with:new_password|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if ($user && password_verify($input['old_password'], $user->password)) {
            if (password_verify($input['new_password'], $user['password'])) {
                return ResponseFormatter::failed('Password Must e Different From Before!');
            }
            $input['new_password'] = bcrypt($input['new_password']);
            User::where('uuid', $user->uuid)->update([
                'password' => $input['new_password']
            ]);

            return ResponseFormatter::success('Reset Password Successfull!', $user);
        }
        return ResponseFormatter::failed('Password is Wrong!');
    }

    public function setStatus()
    {
        $input = request()->all();
        $user = Auth::user();
        User::where('uuid',  $user->uuid)->update([
            'is_online' => $input['is_online']
        ]);
        event(new SetStatus($user));

        return ResponseFormatter::success('Set Status User Successfull!', []);
    }
}
