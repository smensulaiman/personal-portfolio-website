<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company' => fake()->company(),
            'location' => fake()->city(),
            'role' => fake()->jobTitle(),
            'subtitle' => null,
            'start_date' => 'Jan 2020',
            'end_date' => 'Dec 2021',
            'highlights' => [fake()->sentence(), fake()->sentence()],
            'sort_order' => fake()->numberBetween(0, 10),
        ];
    }

    /**
     * Indicate that this is the current role.
     */
    public function current(): static
    {
        return $this->state(fn (array $attributes) => [
            'end_date' => null,
        ]);
    }
}
