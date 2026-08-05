import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import type { Experience } from '@/types/portfolio';

type Props = {
    experience: Experience | null;
};

/** Split a "one per line" textarea into a clean array of strings. */
function linesToArray(value: unknown): string[] {
    return String(value ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

export default function ExperienceForm({ experience }: Props) {
    const title = experience ? 'Edit role' : 'New role';

    return (
        <>
            <Head title={title} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title={title}
                        description="Highlights render as bullet points on the public timeline."
                    />

                    <Button variant="outline" asChild>
                        <Link href={admin.experiences.index()}>
                            <ArrowLeft />
                            Back
                        </Link>
                    </Button>
                </div>

                <Form
                    {...(experience
                        ? admin.experiences.update.form(experience.id)
                        : admin.experiences.store.form())}
                    transform={(data) => ({
                        ...data,
                        highlights: linesToArray(data.highlights),
                    })}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Role</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-5 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            required
                                            defaultValue={
                                                experience?.company ?? ''
                                            }
                                        />
                                        <InputError message={errors.company} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Title</Label>
                                        <Input
                                            id="role"
                                            name="role"
                                            required
                                            defaultValue={
                                                experience?.role ?? ''
                                            }
                                        />
                                        <InputError message={errors.role} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            defaultValue={
                                                experience?.location ?? ''
                                            }
                                            placeholder="Japan"
                                        />
                                        <InputError message={errors.location} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="subtitle">
                                            Subtitle
                                        </Label>
                                        <Input
                                            id="subtitle"
                                            name="subtitle"
                                            defaultValue={
                                                experience?.subtitle ?? ''
                                            }
                                            placeholder="In-house IT company of…"
                                        />
                                        <InputError message={errors.subtitle} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="start_date">
                                            Start
                                        </Label>
                                        <Input
                                            id="start_date"
                                            name="start_date"
                                            required
                                            defaultValue={
                                                experience?.start_date ?? ''
                                            }
                                            placeholder="Dec 2022"
                                        />
                                        <InputError
                                            message={errors.start_date}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="end_date">End</Label>
                                        <Input
                                            id="end_date"
                                            name="end_date"
                                            defaultValue={
                                                experience?.end_date ?? ''
                                            }
                                            placeholder="Leave empty for Present"
                                        />
                                        <InputError message={errors.end_date} />
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
                                                experience?.sort_order ?? 0
                                            }
                                        />
                                        <InputError
                                            message={errors.sort_order}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Highlights</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-2">
                                    <Label htmlFor="highlights">
                                        One bullet point per line
                                    </Label>
                                    <Textarea
                                        id="highlights"
                                        name="highlights"
                                        rows={10}
                                        defaultValue={(
                                            experience?.highlights ?? []
                                        ).join('\n')}
                                    />
                                    <InputError message={errors.highlights} />
                                </CardContent>
                            </Card>

                            <div>
                                <Button disabled={processing}>
                                    {processing && <Spinner />}
                                    Save role
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ExperienceForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Experience', href: admin.experiences.index() },
    ],
};
