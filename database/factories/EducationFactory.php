<?php

namespace Database\Factories;

use App\Models\Education;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Education>
 */
class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'institution' => fake()->company().' University',
            'degree' => 'BSc in Computer Science & Engineering',
            'start_year' => '2014',
            'end_year' => '2018',
            'highlights' => [fake()->sentence()],
            'sort_order' => 0,
        ];
    }
}
