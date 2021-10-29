@extends('layouts.default')

@section('title', 'Detail Help')

@push('style')
    <style>
        .font-size {
           font-size: 16px;
        }

        .tinggi{
            height: 60px;
        }

    </style>
@endpush

@section('content')
<section id="description" class="card">
    <div class="card-header">
      <h4 class="card-title"><p>{{ $users->user->name }}</p></h4>
    </div>
    <div class="card-content">
      <div class="card-body">
        <div class="card-text">
            <table class="table table-column">
                <tr class="tinggi ">
                    <td class="col-md-6"><p class="font-size">Judul</p></td>
                    <td class="col-md-6"><p class="font-size text-capitalize">{{ $data_jasa->name }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Category</p></td>
                    <td class="col-md-6 "><p class="font-size text-capitalize">{{ $category->category->name }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Status</p></td>
                    <td class="col-md-6 ">
                        @if ($data_jasa->help_status_id == 1)
                        <span class="badge badge-pill badge-warning">pending</span>
                        @endif
                        @if ($data_jasa->help_status_id == 2)
                        <span class="badge badge-pill badge-success">accepted</span>
                        @endif
                        @if ($data_jasa->help_status_id == 3)
                        <span class="badge badge-pill badge-danger">rejected</span>
                        @endif
                        @if ($data_jasa->help_status_id == 4)
                        <span class="badge badge-pill badge-secondary">ended</span>
                        @endif
                    </td>
                </tr>
                @if ($data_jasa->help_status_id == 3)
                <tr class="tinggi">
                    <td>Rejected Reason</td>
                    <td>{{$data_jasa->rejected_reason}}</td>
                </tr>
                @endif
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Quota</p></td>
                    <td class="col-md-6 "><p class="font-size">{{ $data_jasa->quota }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">End Date</p></td>
                    <td class="col-md-6 "><p class="font-size">{{ $data_jasa->end_date }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="my-auto font-size">Description</p></td>
                    <td class="col-md-6 "><p class="font-size">{{$data_jasa->description}}</p>  </td>
                </tr>
                <tr class="my-auto">
                    <td class="col-md-6"><p class="font-size">Foto</p></td>
                    <td class="col-md-6">
                        <a class="btn btn-primary" target="_blank" href="{{$category->photo}}">
                            <i class="fa fa-picture-o"></i>
                        </a>
                    </td>
                </tr>
            </table>

            <br>
            <h4>REPORTS</h4> <br><br>
            <table class="table table-striped table-bordered zero-configuration">
                <thead>
                    <tr>
                        <th class="col-md-2">Pengguna</th>
                        <th class="col-md-2">Report</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($help->reports as $report)
                        <tr>
                            <td>{{ $report->user->name }}</td>
                            <td>{{ $report->report }}</td>
                        </tr>

                    @endforeach
                </tbody>
            </table>

            <br><br>

            <button  data-toggle="modal" data-target="#deleteModal{{$help->id}}"  class="btn btn-outline-danger pull-right">Hapus Bantuan</button>

            <br><br>
                                        <!--Delete Modal -->
                                        <div class="modal fade" id="deleteModal{{$help->id}}" tabindex="-1" role="dialog"
                                            aria-labelledby="deleteModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title" id="deleteModalLabel">Bantuan ini akan dihapus?</h2>
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">

                                                        <div class="d-flex">
                                                            <form action="/jasa/{{ $help->id }}/delete"
                                                                method="post">
                                                                @csrf
                                                                @method("DELETE")

                                                                <button type="button" class="btn btn-secondary"
                                                                    data-dismiss="modal">Batal</button> &nbsp;&nbsp;
                                                                <button class="btn btn-danger" type="submit">
                                                                   Hapus
                                                                </button>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        </div>
      </div>
    </div>
  </section>
@endsection


@push('data-tables')

    <script src="{{ asset('public/app-assets/vendors/js/vendors.min.js') }}" type="text/javascript"></script>
    <!-- BEGIN VENDOR JS-->
    <!-- BEGIN PAGE VENDOR JS-->
    <script src="{{ asset('public/app-assets/vendors/js/tables/datatable/datatables.min.js') }}" type="text/javascript">
    </script>
    <!-- END PAGE VENDOR JS-->
    <!-- BEGIN STACK JS-->
    <script src="{{ asset('public/app-assets/js/core/app-menu.js') }}" type="text/javascript"></script>
    <script src="{{ asset('public/app-assets/js/core/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('public/app-assets/js/scripts/customizer.js') }}" type="text/javascript"></script>
    <!-- END STACK JS-->
    <!-- BEGIN PAGE LEVEL JS-->
    <script src="{{ asset('public/app-assets/js/scripts/tables/datatables/datatable-basic.js') }}" type="text/javascript">
    </script>
@endpush


@push('style')
    <link rel="stylesheet" type="text/css"
        href="{{ asset('public/app-assets/vendors/css/tables/datatable/datatables.min.css') }}">

@endpush

@push('script')
<script src="{{asset('public/app-assets/js/core/app-menu.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/core/app.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/scripts/customizer.js')}}" type="text/javascript"></script>
<!-- END STACK JS-->
<!-- BEGIN PAGE LEVEL JS-->
<script src="{{asset('public/app-assets/js/scripts/pages/dashboard-analytics.js')}}" type="text/javascript"></script>
@endpush
