<?php

namespace App\Http\Controllers;
use App\Models\Help;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JasaController extends Controller
{
    public function jasa_index()
    {
        $jasa = Help::with('user')->where('help_category_id', 4)->get();
        return view('pages.helps.jasa',['data_jasa' => $jasa]);
    }

     public function detailJasa($id){
        $user = Help::with('user')->find($id);
        $data_jasa = DB::table('helps')
                    ->join('users', 'helps.user_id', '=', 'users.id')
                    ->select('helps.*', 'users.document')
                    ->where('helps.id', $id)->first();
        $category = Help::with('category')->find($id);
        $status = Help::with('status')->find($id);

        return view('pages.helps.detail.jasa', ['data_jasa' => $data_jasa, 'category' => $category, 'status' => $status, 'users' => $user]);
    }

    public function setPendingjasa(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 1]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }

     public function setAcceptedjasa(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 2]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }

     public function setRejectedjasa(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 3]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }
}
