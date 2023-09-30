<?php

use App\Models\Paragraph;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/{paragraph?}', function (string $paragraph = null) {
    $paragraphs = Paragraph::query()->get();

    return Inertia::render('Index', compact('paragraphs'));
});
