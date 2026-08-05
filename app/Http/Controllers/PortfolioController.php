<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Show the public portfolio page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('portfolio', [
            'profile' => Profile::current(),
            'skillCategories' => SkillCategory::query()->ordered()->with('skills')->get(),
            'experiences' => Experience::query()->ordered()->get(),
            'projects' => Project::query()->ordered()->get(),
            'educations' => Education::query()->ordered()->get(),
            'certifications' => Certification::query()->ordered()->get(),
        ]);
    }
}
