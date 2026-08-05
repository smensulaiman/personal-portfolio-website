import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import type { Project, ProjectLink } from '@/types/portfolio';

type Props = {
    project: Project | null;
};

export default function ProjectForm({ project }: Props) {
    const title = project ? 'Edit project' : 'New project';

    // Links are kept in React state and injected via `transform` so that
    // clearing every row actually persists as an empty array.
    const [links, setLinks] = useState<ProjectLink[]>(project?.links ?? []);

    const updateLink = (index: number, patch: Partial<ProjectLink>) =>
        setLinks((current) =>
            current.map((link, i) =>
                i === index ? { ...link, ...patch } : link,
            ),
        );

    return (
        <>
            <Head title={title} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title={title}
                        description="Projects without links are shown as internal systems."
                    />

                    <Button variant="outline" asChild>
                        <Link href={admin.projects.index()}>
                            <ArrowLeft />
                            Back
                        </Link>
                    </Button>
                </div>

                <Form
                    {...(project
                        ? admin.projects.update.form(project.id)
                        : admin.projects.store.form())}
                    transform={(data) => ({
                        ...data,
                        featured: data.featured ? 1 : 0,
                        tech: String(data.tech ?? '')
                            .split(',')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        links: links.filter(
                            (link) => link.label.trim() && link.url.trim(),
                        ),
                    })}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-5 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            defaultValue={project?.name ?? ''}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            defaultValue={
                                                project?.category ?? ''
                                            }
                                            placeholder="Web Platform"
                                        />
                                        <InputError message={errors.category} />
                                    </div>

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            required
                                            defaultValue={
                                                project?.description ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tech">
                                            Tech (comma separated)
                                        </Label>
                                        <Input
                                            id="tech"
                                            name="tech"
                                            defaultValue={(
                                                project?.tech ?? []
                                            ).join(', ')}
                                            placeholder="Laravel, Livewire, MySQL"
                                        />
                                        <InputError message={errors.tech} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort_order">
                                            Sort order
                                        </Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            min={0}
                                            defaultValue={
                                                project?.sort_order ?? 0
                                            }
                                        />
                                        <InputError
                                            message={errors.sort_order}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 md:col-span-2">
                                        <Checkbox
                                            id="featured"
                                            name="featured"
                                            defaultChecked={
                                                project?.featured ?? false
                                            }
                                        />
                                        <Label htmlFor="featured">
                                            Feature this project
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Links</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-4">
                                    {links.length === 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            No links — this project will be
                                            labelled as an internal system.
                                        </p>
                                    )}

                                    {links.map((link, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-wrap items-end gap-3"
                                        >
                                            <div className="grid min-w-40 flex-1 gap-2">
                                                <Label
                                                    htmlFor={`link-label-${index}`}
                                                >
                                                    Label
                                                </Label>
                                                <Input
                                                    id={`link-label-${index}`}
                                                    value={link.label}
                                                    onChange={(event) =>
                                                        updateLink(index, {
                                                            label: event.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="Google Play"
                                                />
                                            </div>

                                            <div className="grid min-w-60 flex-[2] gap-2">
                                                <Label
                                                    htmlFor={`link-url-${index}`}
                                                >
                                                    URL
                                                </Label>
                                                <Input
                                                    id={`link-url-${index}`}
                                                    type="url"
                                                    value={link.url}
                                                    onChange={(event) =>
                                                        updateLink(index, {
                                                            url: event.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="https://…"
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Remove link"
                                                onClick={() =>
                                                    setLinks((current) =>
                                                        current.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        ),
                                                    )
                                                }
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                    ))}

                                    <InputError message={errors.links} />

                                    <div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setLinks((current) => [
                                                    ...current,
                                                    { label: '', url: '' },
                                                ])
                                            }
                                        >
                                            <Plus />
                                            Add link
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <Button disabled={processing}>
                                    {processing && <Spinner />}
                                    Save project
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ProjectForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Projects', href: admin.projects.index() },
    ],
};
