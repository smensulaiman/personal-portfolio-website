<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveEducationRequest;
use App\Models\Certification;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    /**
     * List education entries alongside certifications.
     */
    public function index(): Response
    {
        return Inertia::render('admin/education', [
            'educations' => Education::query()->ordered()->get(),
            'certifications' => Certification::query()->ordered()->get(),
        ]);
    }

    /**
     * Store a new education entry.
     */
    public function store(SaveEducationRequest $request): RedirectResponse
    {
        Education::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Education created.')]);

        return to_route('admin.education.index');
    }

    /**
     * Update the given education entry.
     */
    public function update(SaveEducationRequest $request, Education $education): RedirectResponse
    {
        $education->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Education updated.')]);

        return to_route('admin.education.index');
    }

    /**
     * Delete the given education entry.
     */
    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Education deleted.')]);

        return to_route('admin.education.index');
    }
}
