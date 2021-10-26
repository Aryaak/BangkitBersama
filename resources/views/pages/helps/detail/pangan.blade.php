@extends('layouts.default')

@section('title', 'Detail User')

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
                    <td class="col-md-6"><p class="font-size text-capitalize">{{ $data_pangan->name }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Category</p></td>
                    <td class="col-md-6 "><p class="font-size text-capitalize">{{ $category->category->name }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Status</p></td>
                    <td class="col-md-6 "><p class="text-capitalize font-size">{{ $status->status->name }}</p></p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">Quota</p></td>
                    <td class="col-md-6 "><p class="font-size">{{ $data_pangan->quota }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="font-size">End Date</p></td>
                    <td class="col-md-6 "><p class="font-size">{{ $data_pangan->end_date }}</p></td>
                </tr>
                <tr class="tinggi">
                    <td class="col-md-6"><p class="my-auto font-size">Description</p></td>
                    <td class="col-md-6 "><p class="font-size">{{$data_pangan->description}}</p>  </td>
                </tr>
                <tr class="my-auto">
                    <td class="col-md-6"><p class="font-size">Foto</p></td>
                    <td class="col-md-6">
                        <a class="btn btn-primary" href="{{$category->photo}}">
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

@push('script')
<script src="{{asset('public/app-assets/js/core/app-menu.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/core/app.js')}}" type="text/javascript"></script>
<script src="{{asset('public/app-assets/js/scripts/customizer.js')}}" type="text/javascript"></script>
<!-- END STACK JS-->
<!-- BEGIN PAGE LEVEL JS-->
<script src="{{asset('public/app-assets/js/scripts/pages/dashboard-analytics.js')}}" type="text/javascript"></script>
@endpush
