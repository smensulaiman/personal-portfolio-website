<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * List received contact messages.
     */
    public function index(): Response
    {
        return Inertia::render('admin/messages', [
            'messages' => ContactMessage::query()->latest()->get(),
        ]);
    }

    /**
     * Mark the given message as read.
     */
    public function update(ContactMessage $message): RedirectResponse
    {
        $message->markAsRead();

        return to_route('admin.messages.index');
    }

    /**
     * Delete the given message.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Message deleted.')]);

        return to_route('admin.messages.index');
    }
}
