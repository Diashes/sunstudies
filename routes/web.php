<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('index'); });
Route::get('/edit/{id}', function () { return view('index'); });
Route::get('/new', function () { return view('index'); });
Route::get('/admin', function () { return view('index'); });
Route::get('/show/{id}', function () { return view('index'); });