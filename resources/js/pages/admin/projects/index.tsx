import { Head, Link, router } from '@inertiajs/react';
import { GripVertical, Pencil, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';
import type { Project } from '@/types/portfolio';

type Props = {
    projects: Project[];
};

export default function AdminProjects({ projects }: Props) {
    const [items, setItems] = useState(projects);
    const [lastProjects, setLastProjects] = useState(projects);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);

    // Re-sync whenever the server sends a fresh list (save, delete, reload).
    // Adjusting during render rather than in an effect avoids rendering the
    // stale order for a frame first.
    if (projects !== lastProjects) {
        setLastProjects(projects);
        setItems(projects);
    }

    const clearDrag = () => {
        setDragIndex(null);
        setOverIndex(null);
    };

    const move = (from: number, to: number) => {
        if (to < 0 || to >= items.length || from === to) {
            return;
        }

        const next = [...items];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);

        // Optimistic: the list is already in its new order on screen, so the
        // request only needs to persist it.
        setItems(next);

        router.post(
            admin.projects.reorder().url,
            { ids: next.map((project) => project.id) },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <>
            <Head title="Projects" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Projects"
                        description="Drag the handle to reorder — this is the exact order shown on the landing page."
                    />

                    <Button asChild>
                        <Link href={admin.projects.create()}>
                            <Plus />
                            New project
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent>
                        {items.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No projects yet.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10">
                                            <span className="sr-only">
                                                Reorder
                                            </span>
                                        </TableHead>
                                        <TableHead className="w-10">
                                            #
                                        </TableHead>
                                        <TableHead>Project</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Links</TableHead>
                                        <TableHead className="w-24 text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {items.map((project, index) => (
                                        <TableRow
                                            key={project.id}
                                            draggable
                                            onDragStart={(event) => {
                                                setDragIndex(index);
                                                event.dataTransfer.effectAllowed =
                                                    'move';
                                            }}
                                            onDragOver={(event) => {
                                                event.preventDefault();
                                                event.dataTransfer.dropEffect =
                                                    'move';
                                                setOverIndex(index);
                                            }}
                                            onDrop={(event) => {
                                                event.preventDefault();

                                                if (dragIndex !== null) {
                                                    move(dragIndex, index);
                                                }

                                                clearDrag();
                                            }}
                                            onDragEnd={clearDrag}
                                            className={cn(
                                                'cursor-grab active:cursor-grabbing',
                                                dragIndex === index &&
                                                    'opacity-40',
                                                overIndex === index &&
                                                    dragIndex !== index &&
                                                    'border-primary bg-muted/60',
                                            )}
                                        >
                                            <TableCell>
                                                <button
                                                    type="button"
                                                    className="flex size-7 items-center justify-center rounded text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                                    aria-label={`Reorder ${project.name}. Use arrow up and arrow down keys to move it.`}
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key ===
                                                            'ArrowUp'
                                                        ) {
                                                            event.preventDefault();
                                                            move(
                                                                index,
                                                                index - 1,
                                                            );
                                                        }

                                                        if (
                                                            event.key ===
                                                            'ArrowDown'
                                                        ) {
                                                            event.preventDefault();
                                                            move(
                                                                index,
                                                                index + 1,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <GripVertical className="size-4" />
                                                </button>
                                            </TableCell>

                                            <TableCell className="text-sm text-muted-foreground tabular-nums">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell>
                                                <span className="flex items-center gap-2 font-medium">
                                                    {project.featured && (
                                                        <Star
                                                            className="size-3.5 fill-current text-amber-500"
                                                            aria-label="Featured"
                                                        />
                                                    )}
                                                    {project.name}
                                                </span>
                                                <span className="mt-1 block text-xs text-muted-foreground">
                                                    {project.tech.join(' · ')}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-sm text-muted-foreground">
                                                {project.category ?? '—'}
                                            </TableCell>

                                            <TableCell>
                                                {project.links.length === 0 ? (
                                                    <Badge variant="outline">
                                                        None
                                                    </Badge>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        {project.links.length}
                                                    </span>
                                                )}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <span className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Edit ${project.name}`}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={admin.projects.edit(
                                                                project.id,
                                                            )}
                                                        >
                                                            <Pencil />
                                                        </Link>
                                                    </Button>

                                                    <ConfirmDelete
                                                        action={admin.projects.destroy.form(
                                                            project.id,
                                                        )}
                                                        label={project.name}
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
        </>
    );
}

AdminProjects.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Projects', href: admin.projects.index() },
    ],
};
