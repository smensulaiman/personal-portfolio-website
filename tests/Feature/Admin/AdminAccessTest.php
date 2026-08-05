<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{string}>
     */
    public static function adminPages(): array
    {
        return [
            'dashboard' => ['admin.dashboard'],
            'profile' => ['admin.profile.edit'],
            'skills' => ['admin.skills.index'],
            'experiences' => ['admin.experiences.index'],
            'projects' => ['admin.projects.index'],
            'education' => ['admin.education.index'],
            'messages' => ['admin.messages.index'],
        ];
    }

    #[DataProvider('adminPages')]
    public function test_guests_are_redirected_to_login(string $routeName)
    {
        $this->get(route($routeName))->assertRedirect(route('login'));
    }

    #[DataProvider('adminPages')]
    public function test_authenticated_users_can_open_admin_pages(string $routeName)
    {
        $this->actingAs(User::factory()->create())
            ->get(route($routeName))
            ->assertOk();
    }

    public function test_logging_in_lands_on_the_admin_dashboard()
    {
        $user = User::factory()->create(['email' => 'owner@example.com']);

        $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect(route('admin.dashboard'));

        $this->assertAuthenticatedAs($user);
    }

    public function test_the_admin_root_redirects_to_the_dashboard()
    {
        $this->actingAs(User::factory()->create())
            ->get('/admin')
            ->assertRedirect('/admin/dashboard');
    }
}
