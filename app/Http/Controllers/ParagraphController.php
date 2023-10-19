<?php

namespace App\Http\Controllers;

use App\Models\Paragraph;
use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParagraphController extends Controller
{
    public function index(Request $request, string $lang, string $slug)
    {
        $paragraph = Paragraph::whereLang($lang)->whereSlug($slug)->firstOrFail();

        $paragraphs = [
            $paragraph,
            ...Paragraph::getNextRandomParagraphs($lang, [$paragraph->id]),
        ];

        return Inertia::render('Index', compact('paragraphs'));
    }

    public function redirect(Request $request)
    {
        $lang = $request->cookie(AppServiceProvider::X_COOKIE_LANG_NAME, 'en-US');

        $slug = Paragraph::getRandomSlug($lang);

        return redirect("/{$lang}/{$slug}");
    }
}
