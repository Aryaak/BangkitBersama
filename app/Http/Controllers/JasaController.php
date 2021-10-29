<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\FCMController;
use App\Models\Help;
use Illuminate\Support\Facades\DB;

class JasaController extends Controller
{
   public function jasa_index()
   {
      $jasa = Help::with('user')->where('help_category_id', 4)->get();
      return view('pages.helps.jasa', ['data_jasa' => $jasa]);
   }

   public function detailJasa($id)
   {
      $user = Help::with('user')->find($id);
      $data_jasa = DB::table('helps')
         ->join('users', 'helps.user_id', '=', 'users.id')
         ->select('helps.*', 'users.document')
         ->where('helps.id', $id)->first();
      $category = Help::with('category')->find($id);
      $status = Help::with('status')->find($id);
      $help = Help::where('id', $id)->with('reports.user')->first();

      return view('pages.helps.detail.jasa', ['data_jasa' => $data_jasa, 'category' => $category, 'status' => $status, 'users' => $user, 'help' => $help]);
   }

   public function setPendingjasa($id)
   {
      Help::where('id', $id)->update(['help_status_id' => 1]);
      session()->flash("success", "Data Telah Diupdate");
      return redirect()->back();
   }

   public function setAcceptedjasa($id)
   {
      $query = Help::where('id', $id);
      $query->update(['help_status_id' => 2]);
      session()->flash("success", "Data Telah Diupdate");

      $help = $query->with('user')->first();

      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah disetujui. Kini bantuan anda dapat ditemukan pengguna lain.');

      return redirect()->back();
   }

   public function setRejectedjasa($id)
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
      session()->flash("success", "Data Berhasil Dihapuus");


      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah dihapus. Karena banyak laporan negatif dari bantuan anda, kami memutuskan unutuk menghapusnya.');
      return redirect('jasa');
   }
}
