<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveSkillCategoryRequest;
use App\Models\SkillCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillCategoryController extends Controller
{
    /**
     * List the skill categories and their skills.
     */
    public function index(): Response
    {
        return Inertia::render('admin/skills', [
            'categories' => SkillCategory::query()->ordered()->with('skills')->get(),
        ]);
    }

    /**
     * Store a new skill category.
     */
    public function store(SaveSkillCategoryRequest $request): RedirectResponse
    {
        SkillCategory::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category created.')]);

        return to_route('admin.skills.index');
    }

    /**
     * Update the given skill category.
     */
    public function update(SaveSkillCategoryRequest $request, SkillCategory $category): RedirectResponse
    {
        $category->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category updated.')]);

        return to_route('admin.skills.index');
    }

    /**
     * Delete the given skill category and its skills.
     */
    public function destroy(SkillCategory $category): RedirectResponse
    {
        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Category deleted.')]);

        return to_route('admin.skills.index');
    }
}
