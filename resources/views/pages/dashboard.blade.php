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


  <!-- Analytics map based session -->
  <!-- Bounce Rate & List -->

  <!--/ Bounce Rate & List -->
</div>

@endsection
