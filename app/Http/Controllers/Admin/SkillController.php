<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveSkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Store a new skill.
     */
    public function store(SaveSkillRequest $request): RedirectResponse
    {
        Skill::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill created.')]);

        return to_route('admin.skills.index');
    }

    /**
     * Update the given skill.
     */
    public function update(SaveSkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill updated.')]);

        return to_route('admin.skills.index');
    }

    /**
     * Delete the given skill.
     */
    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Skill deleted.')]);

        return to_route('admin.skills.index');
    }
}
