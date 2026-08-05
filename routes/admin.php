<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillCategoryController;
use App\Http\Controllers\Admin\SkillController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::redirect('/', '/admin/dashboard');

        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('skills', [SkillCategoryController::class, 'index'])->name('skills.index');
        Route::post('skill-categories', [SkillCategoryController::class, 'store'])->name('skill-categories.store');
        Route::patch('skill-categories/{category}', [SkillCategoryController::class, 'update'])->name('skill-categories.update');
        Route::delete('skill-categories/{category}', [SkillCategoryController::class, 'destroy'])->name('skill-categories.destroy');

        Route::post('skills', [SkillController::class, 'store'])->name('skills.store');
        Route::patch('skills/{skill}', [SkillController::class, 'update'])->name('skills.update');
        Route::delete('skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');

        Route::resource('experiences', ExperienceController::class)->except('show');

        Route::post('projects/reorder', [ProjectController::class, 'reorder'])->name('projects.reorder');
        Route::resource('projects', ProjectController::class)->except('show');

        Route::get('education', [EducationController::class, 'index'])->name('education.index');
        Route::post('education', [EducationController::class, 'store'])->name('education.store');
        Route::patch('education/{education}', [EducationController::class, 'update'])->name('education.update');
        Route::delete('education/{education}', [EducationController::class, 'destroy'])->name('education.destroy');

        Route::post('certifications', [CertificationController::class, 'store'])->name('certifications.store');
        Route::patch('certifications/{certification}', [CertificationController::class, 'update'])->name('certifications.update');
        Route::delete('certifications/{certification}', [CertificationController::class, 'destroy'])->name('certifications.destroy');

        Route::get('messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::patch('messages/{message}', [ContactMessageController::class, 'update'])->name('messages.update');
        Route::delete('messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    });
