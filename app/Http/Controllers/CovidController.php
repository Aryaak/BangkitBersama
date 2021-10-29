<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\FCMController;
use App\Models\Help;
use Illuminate\Support\Facades\DB;

class CovidController extends Controller
{
   public function covid_index()
   {

      $covid = Help::with('user')->where('help_category_id', 1)->get();
      return view('pages.helps.covid', ['data_covid' => $covid]);
   }

   public function detailCovid($id)
   {
      $user = Help::with('user')->find($id);
      $data_covid = DB::table('helps')
         ->join('users', 'helps.user_id', '=', 'users.id')
         ->select('helps.*', 'users.document')
         ->where('helps.id', $id)->first();

      $category = Help::with('category')->find($id);
      $status = Help::with('status')->find($id);
      $help = Help::where('id', $id)->with('reports.user')->first();

      // dd($data_covid);
      return view('pages.helps.detail.covid', ['data_covid' => $data_covid, 'category' => $category, 'status' => $status, 'users' => $user, 'help' => $help]);
   }


   public function setAcceptedCovid($id)
   {
      $query = Help::where('id', $id);
      $query->update(['help_status_id' => 2]);
      session()->flash("success", "Data Telah Diupdate");

      $help = $query->with('user')->first();

      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah disetujui. Kini bantuan anda dapat ditemukan pengguna lain.');

      return redirect()->back();
   }

   public function setRejectedCovid($id)
   {
      $query = Help::where('id', $id);
      $query->update(['help_status_id' => 3, 'rejected_reason' => request('rejected_reason')]);
      session()->flash("success", "Data Telah Diupdate");


      $help = $query->with('user')->first();

      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah ditolak. Segera lakukan perbaikan.');
      return redirect()->back();
   }

   public function delete($id)
   {
      $query = Help::where('id', $id);
      $help = $query->with('user')->first();
      $query->delete();
      session()->flash("success", "Data Berhasil Dihapus");


      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah dihapus. Karena banyak laporan negatif dari bantuan anda, kami memutuskan unutuk menghapusnya.');
      return redirect('covid');
   }
}
