<?php

namespace App\Http\Controllers;
use App\Models\Help;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EkonomiController extends Controller
{
    public function ekonomi_index()
    {
        $ekonomi = Help::with('user')->where('help_category_id', 2)->get();
        // dd($ekonomi);
        return view('pages.helps.ekonomi',['data_ekonomi' => $ekonomi]);
    }


    public function setPendingEkonomi(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 1]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }

     public function setAcceptedEkonomi(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 2]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }

     public function setRejectedEkonomi(Request $request, $id){
        Help::where('id',$id)->update(['help_status_id' => 3]);
        session()->flash("success", "Data Telah Diupdate");
        return redirect()->back();
     }

     public function detailEkonomi($id){
        $user = Help::with('user')->find($id);
        $data_ekonomi = DB::table('helps')
                    ->join('users', 'helps.user_id', '=', 'users.id')
                    ->select('helps.*', 'users.document')
                    ->where('helps.id', $id)->first();
        $category = Help::with('category')->find($id);
        $status = Help::with('status')->find($id);

        return view('pages.helps.detail.ekonomi', ['data_ekonomi' => $data_ekonomi, 'category' => $category, 'status' => $status, 'users' => $user]);
    }
}
