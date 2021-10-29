<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\FCMController;
use App\Models\Help;
use Illuminate\Support\Facades\DB;

class PanganController extends Controller
{
   public function pangan_index()
   {
      $pangan = Help::with('user')->where('help_category_id', 3)->get();
      return view('pages.helps.pangan', ['data_pangan' => $pangan]);
   }

   public function detailPangan($id)
   {
      $user = Help::with('user')->find($id);
      $data_pangan = DB::table('helps')
         ->join('users', 'helps.user_id', '=', 'users.id')
         ->select('helps.*', 'users.document')
         ->where('helps.id', $id)->first();
      $category = Help::with('category')->find($id);
      $status = Help::with('status')->find($id);
      $help = Help::where('id', $id)->with('reports.user')->first();

      return view('pages.helps.detail.pangan', ['data_pangan' => $data_pangan, 'category' => $category, 'status' => $status, 'users' => $user, 'help' => $help]);
   }

   public function setPendingPangan($id)
   {
      Help::where('id', $id)->update(['help_status_id' => 1]);
      session()->flash("success", "Data Telah Diupdate");
      return redirect()->back();
   }

   public function setAcceptedPangan($id)
   {
      $query = Help::where('id', $id);
      $query->update(['help_status_id' => 2]);
      session()->flash("success", "Data Telah Diupdate");

      $help = $query->with('user')->first();

      FCMController::send($help->user->device_token, $help->name, 'Bantuan anda telah disetujui. Kini bantuan anda dapat ditemukan pengguna lain.');

      return redirect()->back();
   }

   public function setRejectedPangan($id)
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
      return redirect('pangan');
   }
}
