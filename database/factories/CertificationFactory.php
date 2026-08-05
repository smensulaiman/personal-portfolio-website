<?php

namespace Database\Factories;

use App\Models\Certification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certification>
 */
class CertificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'issuer' => fake()->company(),
            'icon_class' => 'bx bx-certification',
            'year' => (string) fake()->year(),
            'sort_order' => fake()->numberBetween(0, 10),
        ];
    }
}
