<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string|null $category
 * @property array<int, string> $tech
 * @property array<int, array{label: string, url: string}> $links
 * @property bool $featured
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name', 'description', 'category', 'tech',
    'links', 'featured', 'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /**
     * Order projects the way they should be displayed. Projects with at least
     * one link lead, since a visitor can actually go and look at those; within
     * each group `sort_order` — the admin drag-and-drop sequence — decides.
     * `featured` must not float rows out of place.
     *
     * The admin list uses this same scope, so what is dragged there is what
     * the public grid shows.
     *
     * @param  Builder<$this>  $query
     */
    #[Scope]
    protected function ordered(Builder $query): void
    {
        // `links` is a JSON array; the length function for it is driver-specific.
        $length = $query->getModel()->getConnection()->getDriverName() === 'sqlite'
            ? 'json_array_length(links)'
            : 'json_length(links)';

        $query->orderByRaw("{$length} = 0")
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tech' => 'array',
            'links' => 'array',
            'featured' => 'boolean',
        ];
    }
}
