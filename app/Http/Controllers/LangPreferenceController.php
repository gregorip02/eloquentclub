<?php

namespace App\Http\Controllers;

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
        $request->validate(['lang' => 'required']);

        $cookie = Cookie::forever('x-user-lang', $request->input('lang'));

        return redirect('/')->withCookie($cookie);
    }
}
