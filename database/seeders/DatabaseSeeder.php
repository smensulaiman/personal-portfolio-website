<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $email = (string) config('portfolio.admin.email');

        if (! User::query()->where('email', $email)->exists()) {
            User::factory()->create([
                'name' => config('portfolio.admin.name'),
                'email' => $email,
                'password' => config('portfolio.admin.password'),
            ]);
        }

        $this->call(PortfolioSeeder::class);
    }
}
