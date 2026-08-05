<?php

namespace App\Models;

use Database\Factories\ProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $headline
 * @property string $summary
 * @property string $email
 * @property string|null $phone
 * @property string|null $location
 * @property string|null $github_url
 * @property string|null $linkedin_url
 * @property string|null $nationality
 * @property string|null $spoken_languages
 * @property Carbon|null $birth_date
 * @property string|null $avatar_path
 * @property string|null $resume_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name', 'headline', 'summary', 'email', 'phone', 'location',
    'github_url', 'linkedin_url', 'nationality', 'spoken_languages',
    'birth_date', 'avatar_path', 'resume_path',
])]
class Profile extends Model
{
    /** @use HasFactory<ProfileFactory> */
    use HasFactory;

    /**
     * Get the single profile record, creating a placeholder when none exists.
     */
    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'name' => 'Your Name',
            'headline' => 'Software Engineer',
            'summary' => 'Add your professional summary from the admin panel.',
            'email' => 'you@example.com',
        ]);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
        ];
    }
}
