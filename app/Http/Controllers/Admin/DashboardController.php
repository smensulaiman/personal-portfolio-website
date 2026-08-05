<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'projects' => Project::query()->count(),
                'featuredProjects' => Project::query()->where('featured', true)->count(),
                'skills' => Skill::query()->count(),
                'experiences' => Experience::query()->count(),
                'certifications' => Certification::query()->count(),
                'unreadMessages' => ContactMessage::query()->unread()->count(),
            ],
            'recentMessages' => ContactMessage::query()
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
