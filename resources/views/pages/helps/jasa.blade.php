@extends('layouts.default')

@section('title', 'Help Jasa')

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
            <h4 class="card-title">Tabel Jasa</h4>
            <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
          </div>
          <div class="card-content collapse show">
            <div class="card-body card-dashboard">
                <table class="table table-striped table-bordered zero-configuration">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Inisiator</th>
                      <th>Kuota</th>
                      <th>Start date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach ($data_jasa as $jasa)
                    <tr>
                      <td>{{$jasa -> name}}</td>
                      <td>{{$jasa -> user->name}}</td>
                      <td>{{$jasa -> quota}}</td>
                      <td>{{$jasa -> end_date}}</td>
                      <td>
                        <button class="btn  btn-warning" data-toggle="modal" data-target="#pendingleModal" type="submit">
                            <i class="ft-clock"></i>
                        </button>

                        <button class="btn btn-success" data-toggle="modal" data-target="#accModal" type="submit">
                            <i class="ft-check-square"></i>
                        </button>

                        <button class="btn btn-danger" data-toggle="modal" data-target="#rejectedModal" type="submit">
                            <i class="ft-x-square"></i>
                        </button>
                        <a href="{{route('jasa.detail', $jasa->id)}}" class="btn btn-info">
                            <i class="ft-eye"></i>
                        </a>
                      </td>
                    </tr>
                    @endforeach
                  </tbody>
                    </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
    <!--Pending Modal -->
    <div class="modal fade" id="pendingleModal" tabindex="-1" role="dialog" aria-labelledby="pendingleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h2 class="modal-title" id="pendingleModalLabel">Ubah status Jadi Pending?</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <h3 class="text-capitalize">
                    {{$jasa -> name}}
                </h3>
                <h3 class="text-capitalize">
                    {{$jasa -> user -> name}}
                </h3>

                <div class="d-flex">

                    <form action="/jasa/{{$jasa->id}}/pending" method="post">
                        @csrf
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button class="btn btn-warning" type="submit">
                            Set Pending
                        </button>
                    </form>
                </div>

            </div>
        </div>
        </div>
    </div>


      <!--Accepted Modal -->
      <div class="modal fade" id="accModal" tabindex="-1" role="dialog" aria-labelledby="accModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h2 class="modal-title" id="accModalLabel">Ubah status Jadi Accepted?</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <h3 class="text-capitalize">
                    {{$jasa -> name}}
                </h3>
                <h3 class="text-capitalize">
                    {{$jasa -> user -> name}}
                </h3>

                <div class="d-flex">

                    <form action="/jasa/{{$jasa->id}}/accepted" method="post">
                        @csrf
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button class="btn btn-success" type="submit">
                            Set Accepted
                        </button>
                    </form>
                </div>

            </div>
        </div>
        </div>
    </div>

    <div class="modal fade" id="rejectedModal" tabindex="-1" role="dialog" aria-labelledby="rejectedModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h2 class="modal-title" id="rejectedModalLabel">Ubah status Jadi Rejected?</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <h3 class="text-capitalize">
                    {{$jasa -> name}}
                </h3>
                <h3 class="text-capitalize">
                    {{$jasa -> user -> name}}
                </h3>

                <div class="d-flex">

                    <form action="/jasa/{{$jasa->id}}/rejected" method="post">
                        @csrf
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button class="btn btn-danger" type="submit">
                            Set Rejected
                        </button>
                    </form>
                </div>

            </div>
        </div>
        </div>
    </div>
@endsection

@push('data-tables')

<script src="{{asset('app-assets/vendors/js/vendors.min.js')}}" type="text/javascript"></script>
<!-- BEGIN VENDOR JS-->
<!-- BEGIN PAGE VENDOR JS-->
<script src="{{asset('app-assets/vendors/js/tables/datatable/datatables.min.js')}}" type="text/javascript"></script>
<!-- END PAGE VENDOR JS-->
<!-- BEGIN STACK JS-->
<script src="{{asset('app-assets/js/core/app-menu.js')}}" type="text/javascript"></script>
<script src="{{asset('app-assets/js/core/app.js')}}" type="text/javascript"></script>
<script src="{{asset('app-assets/js/scripts/customizer.js')}}" type="text/javascript"></script>
<!-- END STACK JS-->
<!-- BEGIN PAGE LEVEL JS-->
<script src="{{asset('app-assets/js/scripts/tables/datatables/datatable-basic.js')}}"
type="text/javascript"></script>
@endpush

@push('style')
  <link rel="stylesheet" type="text/css" href="{{asset('app-assets/vendors/css/tables/datatable/datatables.min.css')}}">

@endpush
