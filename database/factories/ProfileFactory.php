<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'headline' => 'Full-Stack Software Engineer',
            'summary' => fake()->paragraph(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'location' => fake()->city(),
            'github_url' => 'https://github.com/'.fake()->userName(),
            'linkedin_url' => null,
            'nationality' => fake()->country(),
            'spoken_languages' => 'English',
            'birth_date' => fake()->date(),
            'avatar_path' => null,
            'resume_path' => null,
        ];
    }
}
