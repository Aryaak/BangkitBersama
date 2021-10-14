@extends('layouts.default')

@section('title', 'Dashboard')

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
                <h3 class="primary">{{$user}}</h3>
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
                <h3 class="danger">{{$covid}}</h3>
                <span>Bantuan Covid</span>
              </div>
              <div class="media-right media-middle">
                <i class="icon-heart danger font-large-2 float-right"></i>
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
                <h3 class="success">{{$ekonomi}}</h3>
                <span>Bantuan Ekonomi</span>
              </div>
              <div class="media-right media-middle">
                <i class="icon-drawer success font-large-2 float-right"></i>
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
                <h3 class="warning">{{$pangan}}</h3>
                <span>Bantuan Pangan</span>
              </div>
              <div class="media-right media-middle">
                <i class="icon-cup warning font-large-2 float-right"></i>
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
                  <h3 class="primary">{{$jasa}}</h3>
                  <span>Bantuan Jasa</span>
                </div>
                <div class="media-right media-middle">
                  <i class="icon-paper-clip primary font-large-2 float-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <section id="description" class="card">
    <div class="card-header">
      <h4 class="card-title">Chart User</h4>
    </div>
    <div class="card-content">
      <div class="card-body">
        <div class="card-text">
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  </section>

</div>

@endsection

@push('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
    <script>
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        </script>
@endpush
