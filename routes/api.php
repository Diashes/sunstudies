<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SunstudyController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('sunstudies', SunstudyController::class);
Route::resource('images', ImageController::class);
