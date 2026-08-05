<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the portfolio profile form.
     */
    public function edit(): Response
    {
        return Inertia::render('admin/profile', [
            'profile' => Profile::current(),
        ]);
    }

    /**
     * Update the portfolio profile.
     */
    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $profile = Profile::current();

        $attributes = collect($request->validated())
            ->except(['avatar', 'resume'])
            ->all();

        if ($request->hasFile('avatar')) {
            $this->deleteExisting($profile->avatar_path);
            $attributes['avatar_path'] = $request->file('avatar')->store('portfolio', 'public');
        }

        if ($request->hasFile('resume')) {
            $this->deleteExisting($profile->resume_path);
            $attributes['resume_path'] = $request->file('resume')->store('portfolio', 'public');
        }

        $profile->update($attributes);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return to_route('admin.profile.edit');
    }

    /**
     * Remove a previously uploaded file from public storage.
     */
    private function deleteExisting(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
