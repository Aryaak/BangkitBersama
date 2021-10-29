@extends('layouts.default')

@section('title', 'Help Pangan')

@section('content')
<section id="configuration">
    <div class="row">
      <div class="col-12">
        <div class="card">
            @if ($message = Session::get('success'))
            <div class="alert bg-success alert-dismissible mb-2">
              <button type="button" class="close" data-dismiss="alert">×</button>
                <strong>{{ $message }}</strong>
            </div>
          @endif
          <div class="card-header">
            <h4 class="card-title">Tabel Pangan</h4>
            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
          </div>
          <div class="card-content collapse show">
            <div class="card-body card-dashboard">

                <table class="table table-striped table-bordered zero-configuration">
                  <thead>
                    <tr>
                        <th class="col-md-2">Judul</th>
                        <th class="col-md-2">Inisiator</th>
                        <th class="col-md-1">Kuota</th>
                        <th class="col-md-1">Start date</th>
                        <th class="col-md-1">Status</th>
                        <th class="col-md-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach ($data_pangan as $pangan)
                    <tr>
                      <td>{{$pangan -> name}}</td>
                      <td>{{$pangan -> user->name}}</td>
                      <td>{{$pangan -> quota}}</td>
                      <td>{{$pangan -> end_date}}</td>
                      <td>
                        @if ($pangan->help_status_id == 1)
                        <span class="badge badge-pill badge-warning">pending</span>
                        @endif
                        @if ($pangan->help_status_id == 2)
                        <span class="badge badge-pill badge-success">accepted</span>
                        @endif
                        @if ($pangan->help_status_id == 3)
                        <span class="badge badge-pill badge-danger">rejected</span>
                        @endif
                        @if ($pangan->help_status_id == 4)
                        <span class="badge badge-pill badge-secondary">ended</span>
                        @endif
                      </td>
                      <td>
                        <a href="{{ route('pangan.detail', $pangan->id) }}" class="btn btn-info">
                            <i class="fa fa-eye"></i>
                        </a>
                            @if ($pangan->help_status_id == 1)
                            <button
                            class="btn btn-success "
                            data-toggle="modal" data-target="#accModal{{ $pangan->id }}" type="submit">
                            <i class="fa fa-check"></i>
                        </button>
                    @endif

                    @if ($pangan->help_status_id == 1)
                        <button
                        class="btn btn-danger"
                        data-toggle="modal" data-target="#rejectedModal{{ $pangan->id }}" type="submit">
                        <i class="fa fa-times"></i>
                        </button>
                    @endif



                      </td>
                    </tr>

                        <!--Accepted Modal -->
                        <div class="modal fade" id="accModal{{$pangan->id}}" tabindex="-1" role="dialog" aria-labelledby="accModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h2 class="modal-title" id="accModalLabel">Ubah status jadi accepted?</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex">
                                        <form action="/pangan/{{$pangan->id}}/accepted" method="post">
                                            @csrf
                                            <button type="button" class="btn btn-secondary mr-1" data-dismiss="modal">Close</button>
                                            <button class="btn btn-success" type="submit">
                                                Set Accepted
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="modal fade" id="rejectedModal{{$pangan->id}}" tabindex="-1" role="dialog" aria-labelledby="rejectedModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h2 class="modal-title" id="rejectedModalLabel">Ubah status jadi rejected?</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                    <div >
                                        <form action="/pangan/{{$pangan->id}}/rejected" method="post">
                                            @csrf
                                            <div class="form-group">
                                                <label for="rejected_reason">Alasan</label>
                                                <textarea required rows="10" placeholder="Masukan alasan anda menolak verifikasi bantuan berikut &#10contoh: Bantuan tidak valid" class="form-control" name="rejected_reason" id="rejected_reason" rows="3"></textarea>
                                            </div>
                                            <div class="ml-auto pull-right">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button class="btn btn-danger" type="submit">
                                                    Set Rejected
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                            </div>
                        </div>
                    @endforeach
                  </tbody>

                    </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>


@endsection

@push('data-tables')

<script src="{{asset('public/app-assets/vendors/js/vendors.min.js')}}" type="text/javascript"></script>
<!-- BEGIN VENDOR JS-->
<!-- BEGIN PAGE VENDOR JS-->
<script src="{{asset('public/app-assets/vendors/js/tables/datatable/datatables.min.js')}}" type="text/javascript"></script>
<!-- END PAGE VENDOR JS-->
<!-- BEGIN STACK JS-->
<script src="{{asset('public/app-assets/js/core/app-menu.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/core/app.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/scripts/customizer.js')}}" type="text/javascript"></script>
<!-- END STACK JS-->
<!-- BEGIN PAGE LEVEL JS-->
<script src="{{asset('public/app-assets/js/scripts/tables/datatables/datatable-basic.js')}}"
type="text/javascript"></script>
@endpush

@push('style')
  <link rel="stylesheet" type="text/css" href="{{asset('public/app-assets/vendors/css/tables/datatable/datatables.min.css')}}">

@endpush

