<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Help;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user= User::all()->count();
        $covid = Help::all()->where('help_category_id', 1)->count();
        $ekonomi = Help::all()->where('help_category_id', 2)->count();
        $pangan = Help::all()->where('help_category_id', 3)->count();
        $jasa = Help::all()->where('help_category_id', 4)->count();

        return view('pages.dashboard', ['user' => $user, 'covid' => $covid, 'ekonomi' => $ekonomi, 'pangan' => $pangan, 'jasa' => $jasa
    ]);
    }
}
