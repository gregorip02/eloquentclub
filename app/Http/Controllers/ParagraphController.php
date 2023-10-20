<?php

namespace App\Http\Controllers;

use App\Models\Paragraph;
use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParagraphController extends Controller
{
    /**
     * Return a paragraph based on the slug received in the URL, and generate N
     * additional random paragraphs based on the language received as a parameter.
     */
    public function index(Request $request, string $lang, string $slug)
    {
        $paragraph = Paragraph::whereLang($lang)->whereSlug($slug)->firstOrFail();

        $paragraphs = [
            $paragraph,
            ...Paragraph::getNextRandomParagraphs($lang, 10, [$paragraph->id]),
        ];

        return Inertia::render('Index', compact('paragraphs'));
    }

    public function random(Request $request, string $lang)
    {
        $request->validate([
            'count' => 'sometimes|numeric|min:1|max:20',
            'not' => 'sometimes|string',
        ]);

        $count = $request->integer('count', 10);

        $not = explode(':', $request->input('not', ''));

        return Paragraph::getNextRandomParagraphs($lang, $count, $not);
    }

    /**
     * Requests received at the root of the page should be redirected to a random
     * paragraph.
     */
    public function redirect(Request $request)
    {
        $lang = $request->cookie(AppServiceProvider::X_COOKIE_LANG_NAME, 'en-US');

        $slug = Paragraph::getRandomSlug($lang);

        return redirect("/{$lang}/{$slug}");
    }
}
