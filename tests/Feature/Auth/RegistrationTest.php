<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_is_disabled_for_this_single_author_portfolio()
    {
        $this->assertFalse(Features::enabled(Features::registration()));
    }

    public function test_registration_routes_are_not_registered()
    {
        $this->assertFalse(app('router')->has('register'));
        $this->assertFalse(app('router')->has('register.store'));
    }

    public function test_posting_to_the_registration_endpoint_is_not_found()
    {
        $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertNotFound();

        $this->assertGuest();
    }
}
