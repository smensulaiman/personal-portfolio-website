<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveCertificationRequest;
use App\Models\Certification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CertificationController extends Controller
{
    /**
     * Store a new certification.
     */
    public function store(SaveCertificationRequest $request): RedirectResponse
    {
        Certification::query()->create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification created.')]);

        return to_route('admin.education.index');
    }

    /**
     * Update the given certification.
     */
    public function update(SaveCertificationRequest $request, Certification $certification): RedirectResponse
    {
        $certification->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification updated.')]);

        return to_route('admin.education.index');
    }

    /**
     * Delete the given certification.
     */
    public function destroy(Certification $certification): RedirectResponse
    {
        $certification->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification deleted.')]);

        return to_route('admin.education.index');
    }
}
