import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import admin from '@/routes/admin';
import type { Experience } from '@/types/portfolio';

type Props = {
    experiences: Experience[];
};

export default function AdminExperiences({ experiences }: Props) {
    return (
        <>
            <Head title="Experience" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Experience"
                        description="Roles shown on the public timeline, newest first."
                    />

                    <Button asChild>
                        <Link href={admin.experiences.create()}>
                            <Plus />
                            New role
                        </Link>
                    </Button>
                </div>

                {experiences.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No experience entries yet.
                    </p>
                ) : (
                    <div className="grid gap-4">
                        {experiences.map((experience) => (
                            <Card key={experience.id}>
                                <CardContent className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="flex flex-wrap items-center gap-2 font-medium">
                                            {experience.company}
                                            {!experience.end_date && (
                                                <Badge variant="secondary">
                                                    Current
                                                </Badge>
                                            )}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {experience.role}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {experience.start_date} —{' '}
                                            {experience.end_date ?? 'Present'}
                                            {experience.location
                                                ? ` · ${experience.location}`
                                                : ''}
                                            {` · ${experience.highlights.length} highlights`}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Edit ${experience.company}`}
                                            asChild
                                        >
                                            <Link
                                                href={admin.experiences.edit(
                                                    experience.id,
                                                )}
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>

                                        <ConfirmDelete
                                            action={admin.experiences.destroy.form(
                                                experience.id,
                                            )}
                                            label={experience.company}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

AdminExperiences.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Experience', href: admin.experiences.index() },
    ],
};
