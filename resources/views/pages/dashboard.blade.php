@extends('layouts.default')

@section('title', 'Dashboard')

@push('style')
    <style>
        .tinggi{

            height: 300px;
            width: 600px;
        }
    </style>
@endpush

@section('content')
    <div class="content-header row">
    </div>
    <div class="content-body">
        <!-- Analytics spakline & chartjs  -->
        <div class="row">
            <div class="col-lg-12 col-md-12 col-12">

            </div>
        </div>
        <!--/ Analytics spakline & chartjs  -->
        <!--stats-->
        <div class="row">
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="primary">{{ $user }}</h3>
                                    <span>Total User</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-user-follow primary font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="danger">{{ $bantuan }}</h3>
                                    <span>Total Bantuan</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-book-open danger font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="success">{{ $covid }}</h3>
                                    <span>Bantuan Covid</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-heart success font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="warning">{{ $ekonomi }}</h3>
                                    <span>Bantuan Ekonomi</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-drawer warning font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="primary">{{ $pangan }}</h3>
                                    <span>Bantuan Pangan</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-cup primary font-large-2 float-right"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-body">
                            <div class="media">
                                <div class="media-body text-left w-100">
                                    <h3 class="danger">{{ $jasa }}</h3>
                                    <span>Bantuan Jasa</span>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="icon-paper-clip danger  font-large-2 float-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
            {{-- batas  --}}
            <div class="row match-height">
                <div class="col-xl-8 col-lg-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title">Bantuan</h4>
                      <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                      <div class="heading-elements">
                        <ul class="list-inline mb-0">
                          <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                          <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-content">
                      <div class="card-body">
                        <div id="products-sales" class="height-300 ">
                            <canvas id="myChart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title">New User</h4>
                      <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                      <div class="heading-elements">
                        <ul class="list-inline mb-0">
                          <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div class="card-content px-1">
                      <div id="recent-buyers" class="media-list height-400 position-relative overflow-auto">
                          @foreach ($new_user as $new)
                          <a href="#" class="media border-0">
                            {{-- <div class="media-left pr-1">
                              <span class="avatar avatar-md">
                                <img class="media-object rounded-circle" src="{{url($new->photo)}}"
                                alt="Generic placeholder image">
                                <i></i>
                              </span>
                            </div> --}}
                            <div class="media-body w-100">
                              <h6 class="list-group-item-heading text-capitalize">{{$new-> name}}
                              </h6>
                              <p class="list-group-item-text mb-0">
                                    @if ($new->user_status_id==1)
                                        <span class="badge badge-warning">Pending</span>
                                    @elseif ($new->user_status_id==2)
                                        <span class="badge badge-success">Accepted</span>
                                    @else
                                        <span class="badge badge-danger">Rejected</span>
                                    @endif
                              </p>
                            </div>
                          </a>
                          @endforeach
                      </div>
                    </div>
                  </div>
                </div>
              </div>{{-- batas  --}}


        </section>

    </div>

@endsection

@push('script')
    <script src="{{asset('app-assets/js/core/app-menu.js')}}" type="text/javascript"></script>
    <script src="{{asset('app-assets/js/core/app.js')}}" type="text/javascript"></script>
    <script src="{{asset('app-assets/js/scripts/customizer.js')}}" type="text/javascript"></script>
    <!-- END STACK JS-->
    <!-- BEGIN PAGE LEVEL JS-->
    <script src="{{asset('app-assets/js/scripts/pages/dashboard-analytics.js')}}" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>


    <script>
        var url = "{{ url('/dashboard/chart') }}";
        var Bulan = new Array();
        var Labels = new Array();
        var Covid = new Array();
        var Ekonomi = new Array();
        var Pangan = new Array();
        var Jasa = new Array();

        $(document).ready(function() {
            $.get(url, function(response) {
                console.log(response);
                $.each(response.bulan, function(index, value) {
                    Bulan.push(value);
                });
                $.each(response.covid, function(index, value) {
                    Covid.push(value);
                });
                $.each(response.ekonomi, function(index, value) {
                    Ekonomi.push(value);
                });
                $.each(response.pangan, function(index, value) {
                    Pangan.push(value);
                });
                $.each(response.jasa, function(index, value) {
                    Jasa.push(value);
                });
                new Chart(document.getElementById("myChart"), {
                    type: 'line',
                    data: {
                        labels: Bulan,
                        datasets: [{
                            label: ['covid'],
                            data: Covid,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',

                            ],
                            borderWidth: 1
                        },
                    {
                            label: ['ekonomi'],
                            data: Ekonomi,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',

                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',

                            ],
                            borderWidth: 1
                        },
                        {
                            label: ['pangan'],
                            data: Pangan,
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 206, 86, 1)',

                            ],
                            borderWidth: 1
                        },
                        {
                            label: ['jasa'],
                            data: Jasa,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',

                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',

                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true,

                        },
                            responsive: true,
                            maintainAspectRatio: false
                    }
                });
            });
        });
    </script>


@endpush
