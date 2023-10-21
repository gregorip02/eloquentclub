<?php

namespace App\Console\Commands;

use App\Models\Paragraph;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateParagraphCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make:paragraph';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new paragraph';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $langs = [
            'en-US' => 'Please write the paragraph in english',
            'es-ES' => 'Por favor escribe el párrafo en español',
        ];

        DB::transaction(function () use ($langs) {
            $slug = Paragraph::generateRandomSlug();

            foreach ($langs as $lang => $question) {
                $text = $this->ask("{$question} ({$lang})");
                Paragraph::create(compact('lang', 'text', 'slug'));
            }
        });
    }
}
