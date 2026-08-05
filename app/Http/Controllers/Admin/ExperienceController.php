<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    /**
     * List all experience entries.
     */
    public function index(): Response
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::query()->ordered()->get(),
        ]);
    }

    /**
     * Show the create form.
     */
    public function create(): Response
    {
        return Inertia::render('admin/experiences/form', [
            'experience' => null,
        ]);
    }

    /**
     * Store a new experience entry.
     */
    public function store(SaveExperienceRequest $request): RedirectResponse
    {
        Experience::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Experience created.')]);

        return to_route('admin.experiences.index');
    }

    /**
     * Show the edit form.
     */
    public function edit(Experience $experience): Response
    {
        return Inertia::render('admin/experiences/form', [
            'experience' => $experience,
        ]);
    }

    /**
     * Update the given experience entry.
     */
    public function update(SaveExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Experience updated.')]);

        return to_route('admin.experiences.index');
    }

    /**
     * Delete the given experience entry.
     */
    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Experience deleted.')]);

        return to_route('admin.experiences.index');
    }
}
