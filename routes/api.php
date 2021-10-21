<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\IOFileController;
use App\Http\Controllers\API\HelpController;
use App\Http\Controllers\API\MessageController;

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('profile', [UserController::class, 'profile']);
    Route::put('update', [UserController::class, 'update']);

    Route::post('help/store', [HelpController::class, 'store']);
    Route::get('help/get-all', [HelpController::class, 'getAll']);
    Route::get('help/get-by-inisiator', [HelpController::class, 'getByInisiator']);
    Route::get('help/get-detail/{id}', [HelpController::class, 'getDetail']);
    Route::get('help/get-for-home', [HelpController::class, 'getForHome']);
    Route::post('help/send-request', [HelpController::class, 'sendRequest']);
    Route::put('help/update-request', [HelpController::class, 'updateRequest']);
    Route::delete('help/delete-request', [HelpController::class, 'deleteRequest']);
    Route::put('help/accepted-request', [HelpController::class, 'acceptedRequest']);
    Route::post('help/send-review', [HelpController::class, 'sendReview']);
    Route::put('help/update-review', [HelpController::class, 'updateReview']);
    Route::delete('help/delete-review', [HelpController::class, 'deleteReview']);

    Route::post('message/send', [MessageController::class, 'send']);
    Route::get('message/get/{sender}/{recipent}', [MessageController::class, 'get']);

    Route::post('iofile/upload-photo-profile', [IOFileController::class, 'uploadPhotoProfile']);
    Route::post('iofile/upload-photo-help', [IOFileController::class, 'uploadPhotoHelp']);
    Route::post('iofile/upload-document', [IOFileController::class, 'uploadDocument']);
});