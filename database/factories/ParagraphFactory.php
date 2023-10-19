<?php

namespace Database\Factories;

use App\Models\Paragraph;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'text' => fake()->paragraph(),
            'lang' => 'en-US',
            'slug' => Paragraph::generateRandomSlug(),
        ];
    }

    public function es(): self
    {
        return $this->state([
            'lang' => 'es-ES',
            'text' => fake('es-ES')->paragraph(),
        ]);
    }
}
