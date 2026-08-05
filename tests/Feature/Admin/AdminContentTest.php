<?php

namespace Tests\Feature\Admin;

use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminContentTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_the_profile_can_be_updated()
    {
        Profile::factory()->create();

        $this->actingAs($this->user)
            ->post(route('admin.profile.update'), [
                'name' => 'MD. Sulaiman',
                'headline' => 'Full-Stack Software Engineer',
                'summary' => 'Seven years of building web and mobile products.',
                'email' => 'smensulaiman007@gmail.com',
                'github_url' => 'https://github.com/smensulaiman',
            ])
            ->assertRedirect(route('admin.profile.edit'));

        $this->assertDatabaseHas('profiles', [
            'name' => 'MD. Sulaiman',
            'email' => 'smensulaiman007@gmail.com',
        ]);
    }

    public function test_uploading_an_avatar_and_resume_stores_the_files()
    {
        Storage::fake('public');
        Profile::factory()->create();

        $this->actingAs($this->user)
            ->post(route('admin.profile.update'), [
                'name' => 'MD. Sulaiman',
                'headline' => 'Engineer',
                'summary' => 'Summary text.',
                'email' => 'me@example.com',
                'avatar' => UploadedFile::fake()->image('me.jpg'),
                'resume' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
            ])
            ->assertSessionHasNoErrors();

        $profile = Profile::query()->firstOrFail();

        $this->assertNotNull($profile->avatar_path);
        $this->assertNotNull($profile->resume_path);
        Storage::disk('public')->assertExists($profile->avatar_path);
        Storage::disk('public')->assertExists($profile->resume_path);
    }

    public function test_a_project_can_be_created_updated_and_deleted()
    {
        $this->actingAs($this->user)
            ->post(route('admin.projects.store'), [
                'name' => 'Auction Pro',
                'description' => 'Car auction bidding platform.',
                'category' => 'Web Platform',
                'tech' => ['PHP', 'AWS EC2'],
                'links' => [['label' => 'Website', 'url' => 'https://example.com']],
                'featured' => true,
            ])
            ->assertRedirect(route('admin.projects.index'));

        $project = Project::query()->firstOrFail();

        $this->assertSame(['PHP', 'AWS EC2'], $project->tech);
        $this->assertTrue($project->featured);

        $this->actingAs($this->user)
            ->put(route('admin.projects.update', $project), [
                'name' => 'Auction Pro v2',
                'description' => 'Updated description.',
                'tech' => ['PHP'],
                'links' => [],
                'featured' => false,
            ])
            ->assertRedirect(route('admin.projects.index'));

        $project->refresh();

        $this->assertSame('Auction Pro v2', $project->name);
        $this->assertSame([], $project->links);
        $this->assertFalse($project->featured);

        $this->actingAs($this->user)
            ->delete(route('admin.projects.destroy', $project))
            ->assertRedirect(route('admin.projects.index'));

        $this->assertSame(0, Project::query()->count());
    }

    public function test_projects_can_be_reordered_and_the_public_page_follows()
    {
        $first = Project::factory()->create(['name' => 'First', 'sort_order' => 0]);
        $second = Project::factory()->create(['name' => 'Second', 'sort_order' => 1]);
        $third = Project::factory()->create(['name' => 'Third', 'sort_order' => 2]);

        $this->actingAs($this->user)
            ->post(route('admin.projects.reorder'), [
                'ids' => [$third->id, $first->id, $second->id],
            ])
            ->assertRedirect();

        $this->assertSame(0, $third->fresh()->sort_order);
        $this->assertSame(1, $first->fresh()->sort_order);
        $this->assertSame(2, $second->fresh()->sort_order);

        $this->get('/')->assertInertia(fn ($page) => $page
            ->where('projects.0.name', 'Third')
            ->where('projects.1.name', 'First')
            ->where('projects.2.name', 'Second'),
        );
    }

    public function test_reordering_ignores_the_featured_flag_so_drag_order_wins()
    {
        $plain = Project::factory()->create(['name' => 'Plain', 'sort_order' => 0]);
        $starred = Project::factory()->featured()->create(['name' => 'Starred', 'sort_order' => 1]);

        $this->actingAs($this->user)
            ->post(route('admin.projects.reorder'), [
                'ids' => [$plain->id, $starred->id],
            ])
            ->assertRedirect();

        $this->get('/')->assertInertia(fn ($page) => $page
            ->where('projects.0.name', 'Plain')
            ->where('projects.1.name', 'Starred'),
        );
    }

    public function test_reordering_rejects_unknown_project_ids()
    {
        $this->actingAs($this->user)
            ->post(route('admin.projects.reorder'), ['ids' => [999999]])
            ->assertSessionHasErrors('ids.0');
    }

    public function test_guests_cannot_reorder_projects()
    {
        $project = Project::factory()->create(['sort_order' => 5]);

        $this->post(route('admin.projects.reorder'), ['ids' => [$project->id]])
            ->assertRedirect(route('login'));

        $this->assertSame(5, $project->fresh()->sort_order);
    }

    public function test_a_project_link_requires_a_valid_url()
    {
        $this->actingAs($this->user)
            ->post(route('admin.projects.store'), [
                'name' => 'Broken',
                'description' => 'Bad link.',
                'links' => [['label' => 'Site', 'url' => 'not-a-url']],
            ])
            ->assertSessionHasErrors('links.0.url');
    }

    public function test_an_experience_can_be_created_with_highlights()
    {
        $this->actingAs($this->user)
            ->post(route('admin.experiences.store'), [
                'company' => 'Senda Japan Ltd.',
                'role' => 'Software Engineer',
                'location' => 'Japan',
                'start_date' => 'Dec 2022',
                'end_date' => null,
                'highlights' => ['Owns Auction Pro.', 'Drives AI-assisted delivery.'],
            ])
            ->assertRedirect(route('admin.experiences.index'));

        $experience = Experience::query()->firstOrFail();

        $this->assertCount(2, $experience->highlights);
        $this->assertNull($experience->end_date);
    }

    public function test_skill_categories_and_skills_can_be_managed()
    {
        $this->actingAs($this->user)
            ->post(route('admin.skill-categories.store'), [
                'name' => 'Languages',
                'icon_class' => 'bx bx-code-alt',
            ])
            ->assertRedirect(route('admin.skills.index'));

        $category = SkillCategory::query()->firstOrFail();

        $this->actingAs($this->user)
            ->post(route('admin.skills.store'), [
                'skill_category_id' => $category->id,
                'name' => 'PHP',
                'icon_class' => 'bx bxl-php',
            ])
            ->assertRedirect(route('admin.skills.index'));

        $this->assertDatabaseHas('skills', ['name' => 'PHP', 'icon_class' => 'bx bxl-php']);

        // Deleting the category cascades to its skills.
        $this->actingAs($this->user)
            ->delete(route('admin.skill-categories.destroy', $category))
            ->assertRedirect(route('admin.skills.index'));

        $this->assertSame(0, Skill::query()->count());
    }

    public function test_education_and_certifications_can_be_managed()
    {
        $this->actingAs($this->user)
            ->post(route('admin.education.store'), [
                'institution' => 'Northern University of Bangladesh',
                'degree' => 'BSc in Computer Science & Engineering',
                'start_year' => '2014',
                'end_year' => '2018',
                'highlights' => ['Programming contest champion.'],
            ])
            ->assertRedirect(route('admin.education.index'));

        $this->assertSame(1, Education::query()->count());

        $this->actingAs($this->user)
            ->post(route('admin.certifications.store'), [
                'name' => 'Oracle Certified Associate',
                'issuer' => 'Oracle',
                'year' => '2021',
            ])
            ->assertRedirect(route('admin.education.index'));

        $this->assertSame(1, Certification::query()->count());
    }

    public function test_opening_a_message_marks_it_as_read()
    {
        $message = ContactMessage::factory()->create();

        $this->assertNull($message->read_at);

        $this->actingAs($this->user)
            ->patch(route('admin.messages.update', $message))
            ->assertRedirect(route('admin.messages.index'));

        $this->assertNotNull($message->fresh()->read_at);
    }

    public function test_a_message_can_be_deleted()
    {
        $message = ContactMessage::factory()->create();

        $this->actingAs($this->user)
            ->delete(route('admin.messages.destroy', $message))
            ->assertRedirect(route('admin.messages.index'));

        $this->assertSame(0, ContactMessage::query()->count());
    }

    public function test_the_dashboard_reports_unread_message_counts()
    {
        ContactMessage::factory()->count(2)->create();
        ContactMessage::factory()->read()->create();
        Project::factory()->featured()->create();

        $this->actingAs($this->user)
            ->get(route('admin.dashboard'))
            ->assertInertia(fn ($page) => $page
                ->component('admin/dashboard')
                ->where('stats.unreadMessages', 2)
                ->where('stats.projects', 1)
                ->where('stats.featuredProjects', 1),
            );
    }

    public function test_creating_a_project_requires_a_name()
    {
        $this->actingAs($this->user)
            ->post(route('admin.projects.store'), ['description' => 'No name.'])
            ->assertSessionHasErrors('name');
    }
}
