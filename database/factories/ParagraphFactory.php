<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Inspiring;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paragraph>
 */
class ParagraphFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'text' => Inspiring::quotes()->random(),
            'lang' => 'en',
        ];
    }
}
