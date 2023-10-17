<?php

use App\Http\Controllers\LangPreferenceController;
use App\Http\Controllers\ParagraphController;
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

Route::get('/', [ParagraphController::class, 'redirect']);

Route::get('/preferences/lang', [LangPreferenceController::class, 'index']);
Route::post('/preferences/lang', [LangPreferenceController::class, 'update']);

Route::get('/{lang}/{slug}', [ParagraphController::class, 'index']);
