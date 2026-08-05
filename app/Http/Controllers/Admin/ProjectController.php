<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderProjectsRequest;
use App\Http\Requests\Admin\SaveProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * List all projects.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()->ordered()->get(),
        ]);
    }

    /**
     * Show the create form.
     */
    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => null,
        ]);
    }

    /**
     * Store a new project.
     */
    public function store(SaveProjectRequest $request): RedirectResponse
    {
        Project::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project created.')]);

        return to_route('admin.projects.index');
    }

    /**
     * Show the edit form.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/form', [
            'project' => $project,
        ]);
    }

    /**
     * Update the given project.
     */
    public function update(SaveProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project updated.')]);

        return to_route('admin.projects.index');
    }

    /**
     * Persist a new display order, given project ids in their new sequence.
     */
    public function reorder(ReorderProjectsRequest $request): RedirectResponse
    {
        $ids = $request->validated()['ids'];

        DB::transaction(function () use ($ids) {
            foreach ($ids as $position => $id) {
                Project::query()->whereKey($id)->update(['sort_order' => $position]);
            }
        });

        return back();
    }

    /**
     * Delete the given project.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Project deleted.')]);

        return to_route('admin.projects.index');
    }
}
