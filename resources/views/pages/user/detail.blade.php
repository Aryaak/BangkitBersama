@extends('layouts.default')

@section('title', 'Detail User')

@push('style')
    <style>
        .font-size {
            font-size: 16px;
        }

    </style>
@endpush

@section('content')
<section id="description" class="card">
    <div class="card-header">
      <h4 class="card-title">Detail User</h4>
    </div>
    <div class="card-content">
      <div class="card-body">
        <div class="card-text">
            <table class="table table-column">
                <tr>
                    <td class="font-size">Name</td>
                    <td class="font-size"><p class="text-capitalize">{{ $user->name }}</p></td>
                </tr>
                <tr>
                    <td class="font-size">Nama Pengguna</td>
                    <td class="font-size"><p class="text-capitalize">{{ $user->username }}</p></td>
                </tr>
                <tr>
                    <td class="font-size">Profesi</td>
                    <td class="font-size"><p class="text-capitalize">{{ $user->profession }}</p></td>
                </tr>
                <tr>
                    <td class="font-size">Alamat</td>
                    <td class="font-size"> <p class="text-capitalize">{{ $user->address }}</p></td>
                </tr>
                <tr>
                    <td class="font-size">Email</td>
                    <td class="font-size">{{ $user->email }}</td>
                </tr>
                <tr>
                    <td class="font-size">status</td>
                    <td>
                        @if ($user->user_status_id == 1)
                        <span class="badge badge-pill badge-secondary">unverified</span>
                        @endif
                        @if ($user->user_status_id == 2)
                        <span class="badge badge-pill badge-warning">pending</span>
                        @endif
                        @if ($user->user_status_id == 3)
                        <span class="badge badge-pill badge-success">verified</span>
                        @endif
                        @if ($user->user_status_id == 4)
                        <span class="badge badge-pill badge-danger">rejected</span>
                        @endif
                    </td>
                </tr>
                @if ($user->user_status_id == 4)
                <tr>
                    <td>ALASAN DITOLAK</td>
                    <td>{{$user->rejected_reason}}</td>
                </tr>
                @endif
                <tr>
                    <td class="font-size">Dokumen Verifikasi</td>
                    <td class="font-size">
                        @if ($user->user_status_id != 1)
                        <a class="btn btn-secondary" target="_blank" href="{{$user->document}}">
                            <i class="fa fa-file-o"></i>
                        </a>
                            
                        @else
                            <span>-</span>
                        @endif
                        
                    </td>
                </tr>
                <tr>
                    <td class="font-size"> Foto</td>
                    <td class="font-size">
                        <a class="btn btn-primary" target="_blank" href="{{$user->photo}}">
                            <i class="fa fa-picture-o"></i>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
      </div>
    </div>
  </section>
@endsection
