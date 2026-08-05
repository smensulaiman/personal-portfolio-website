import { Form } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { RouteFormDefinition } from '@/wayfinder';

type Props = {
    /**
     * A Wayfinder `destroy.form(id)` definition. Wayfinder returns a POST
     * definition with a spoofed `_method=DELETE`, so both are accepted.
     */
    action: RouteFormDefinition<'post'> | RouteFormDefinition<'delete'>;
    /** Name of the record, shown in the confirmation copy. */
    label: string;
    description?: string;
    triggerLabel?: string;
};

/**
 * Trash button that asks for confirmation before submitting the delete.
 */
export function ConfirmDelete({
    action,
    label,
    description,
    triggerLabel,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size={triggerLabel ? 'sm' : 'icon'}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={`Delete ${label}`}
                >
                    <Trash2 />
                    {triggerLabel}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <Form {...action} onSuccess={() => setOpen(false)}>
                    {({ processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Delete “{label}”?</DialogTitle>
                                <DialogDescription>
                                    {description ??
                                        'This permanently removes the entry from your portfolio. This action cannot be undone.'}
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="mt-6 gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
