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

    public function chart()
    {
    	$covid['name'] = "Covid";
        $ekonomi['name'] = "Ekonomi";
        $pangan['name'] = "Pangan";
        $jasa['name'] = "Jasa";

        $array_covid = [];
        $array_ekonomi = [];
        $array_pangan = [];
        $array_jasa = [];

        for ($i=1; $i <= 12 ; $i++) {
            $total_covid = Help::where('help_category_id', 1)->whereMonth('created_at', $i)->count();
            if ($total_covid == null) {
                $total_covid = 0;
            }
            array_push($array_covid, (int) $total_covid);

            $total_ekonomi = Help::where('help_category_id', 2)->whereMonth('created_at', $i)->count();
            if ($total_ekonomi == null) {
                $total_ekonomi = 0;
            }
            array_push($array_ekonomi, (int) $total_ekonomi);

            $total_pangan = Help::where('help_category_id', 3)->whereMonth('created_at', $i)->count();
            if ($total_pangan == null) {
                $total_pangan = 0;
            }
            array_push($array_pangan, (int) $total_pangan);

            $total_jasa = Help::where('help_category_id', 4)->whereMonth('created_at', $i)->count();
            if ($total_jasa == null) {
                $total_jasa = 0;
            }
            array_push($array_jasa, (int) $total_jasa);

        }
        $data['covid'] = $array_covid;
        $data['ekonomi'] = $array_ekonomi;
        $data['pangan'] = $array_pangan;
        $data['jasa'] = $array_jasa;


        $data['bulan'] = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    	return response()->json($data);

    }
}
