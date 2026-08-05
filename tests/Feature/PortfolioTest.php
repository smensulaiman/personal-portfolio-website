<?php

namespace Tests\Feature;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_portfolio_page_renders_every_content_section()
    {
        $profile = Profile::factory()->create(['name' => 'MD. Sulaiman']);
        $category = SkillCategory::factory()->create(['name' => 'Languages']);
        Skill::factory()->create([
            'skill_category_id' => $category->id,
            'name' => 'PHP',
        ]);
        Experience::factory()->current()->create(['company' => 'Senda Japan Ltd.']);
        Project::factory()->featured()->create(['name' => 'Auction Pro']);
        Education::factory()->create();
        Certification::factory()->create();

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('portfolio')
                ->where('profile.name', $profile->name)
                ->where('skillCategories.0.name', 'Languages')
                ->where('skillCategories.0.skills.0.name', 'PHP')
                ->where('experiences.0.company', 'Senda Japan Ltd.')
                ->where('projects.0.name', 'Auction Pro')
                ->has('educations', 1)
                ->has('certifications', 1),
            );
    }

    public function test_the_portfolio_page_renders_without_any_content()
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('portfolio')
                ->has('profile')
                ->has('skillCategories', 0)
                ->has('projects', 0),
            );
    }

    public function test_json_casts_survive_the_round_trip()
    {
        $project = Project::factory()->create([
            'tech' => ['Laravel', 'Livewire'],
            'links' => [['label' => 'Google Play', 'url' => 'https://play.google.com/x']],
        ]);

        $this->assertSame(['Laravel', 'Livewire'], $project->fresh()->tech);
        $this->assertSame('Google Play', $project->fresh()->links[0]['label']);
    }

    public function test_experiences_are_ordered_by_sort_order()
    {
        Experience::factory()->create(['company' => 'Second', 'sort_order' => 1]);
        Experience::factory()->create(['company' => 'First', 'sort_order' => 0]);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->where('experiences.0.company', 'First')
            ->where('experiences.1.company', 'Second'),
        );
    }
}
