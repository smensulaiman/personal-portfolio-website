import { Head, router } from '@inertiajs/react';
import { Mail, MailOpen } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import admin from '@/routes/admin';
import type { ContactMessage } from '@/types/portfolio';

type Props = {
    messages: ContactMessage[];
};

export default function AdminMessages({ messages }: Props) {
    const [selected, setSelected] = useState<ContactMessage | null>(null);

    const openMessage = (message: ContactMessage) => {
        setSelected(message);

        if (!message.read_at) {
            router.patch(
                admin.messages.update(message.id).url,
                {},
                { preserveScroll: true, preserveState: true },
            );
        }
    };

    const unreadCount = messages.filter((message) => !message.read_at).length;

    return (
        <>
            <Head title="Messages" />

            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Messages"
                    description={
                        unreadCount > 0
                            ? `${unreadCount} unread of ${messages.length}`
                            : 'Enquiries from the public contact form.'
                    }
                />

                <Card>
                    <CardContent>
                        {messages.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No messages yet.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10" />
                                        <TableHead>From</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Received</TableHead>
                                        <TableHead className="w-28 text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {messages.map((message) => (
                                        <TableRow key={message.id}>
                                            <TableCell>
                                                {message.read_at ? (
                                                    <MailOpen
                                                        className="size-4 text-muted-foreground"
                                                        aria-label="Read"
                                                    />
                                                ) : (
                                                    <Mail
                                                        className="size-4 text-primary"
                                                        aria-label="Unread"
                                                    />
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <span className="flex items-center gap-2 font-medium">
                                                    {message.name}
                                                    {!message.read_at && (
                                                        <Badge variant="secondary">
                                                            New
                                                        </Badge>
                                                    )}
                                                </span>
                                                <span className="block text-xs text-muted-foreground">
                                                    {message.email}
                                                </span>
                                            </TableCell>

                                            <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                                {message.subject ??
                                                    message.message}
                                            </TableCell>

                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(
                                                    message.created_at,
                                                ).toLocaleDateString()}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <span className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openMessage(message)
                                                        }
                                                    >
                                                        View
                                                    </Button>

                                                    <ConfirmDelete
                                                        action={admin.messages.destroy.form(
                                                            message.id,
                                                        )}
                                                        label={`message from ${message.name}`}
                                                    />
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={selected !== null}
                onOpenChange={(open) => !open && setSelected(null)}
            >
                <DialogContent>
                    {selected && (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {selected.subject ?? 'No subject'}
                                </DialogTitle>
                                <DialogDescription>
                                    From {selected.name} ({selected.email}) on{' '}
                                    {new Date(
                                        selected.created_at,
                                    ).toLocaleString()}
                                </DialogDescription>
                            </DialogHeader>

                            <p className="mt-4 text-sm whitespace-pre-wrap">
                                {selected.message}
                            </p>

                            <div className="mt-6">
                                <Button asChild>
                                    <a
                                        href={`mailto:${selected.email}?subject=${encodeURIComponent(
                                            `Re: ${selected.subject ?? 'Your message'}`,
                                        )}`}
                                    >
                                        Reply by email
                                    </a>
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminMessages.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Messages', href: admin.messages.index() },
    ],
};
