<?php

namespace App\Http\Controllers;

use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class LangPreferenceController extends Controller
{
    public function index()
    {
        return Inertia::render('Preferences/Lang');
    }

    public function update(Request $request)
    {
        $request->validate(['code' => 'required']);

        $cookie = Cookie::forever(AppServiceProvider::X_COOKIE_LANG_NAME, $request->input('code'));

        return redirect('/')->withCookie($cookie);
    }
}
