<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Paragraph extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = ['text', 'lang', 'slug'];

    /**
     * Generate a unique slug for the paragraph.
     */
    public static function generateRandomSlug(): string
    {
        $slug = Str::random(12);

        return Paragraph::whereSlug($slug)->exists()
            ? Paragraph::generateRandomSlug()
            : $slug;
    }

    /**
     * Get a unique slug from the database.
     */
    public static function getRandomSlug(string $lang): string
    {
        $id = Paragraph::whereLang($lang)->pluck('id')->random();

        return Paragraph::whereKey($id)->value('slug');
    }

    public static function getNextRandomParagraphs(string $lang, array $not = [], int $count = 4): Collection
    {
        $ids = Paragraph::whereKeyNot($not)->whereLang($lang)->pluck('id')->random($count);

        return Paragraph::whereKey($ids)->get();
    }
}
