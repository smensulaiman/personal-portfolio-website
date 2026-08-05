import { Form, Head } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import type { Certification, Education } from '@/types/portfolio';

type Props = {
    educations: Education[];
    certifications: Certification[];
};

/** Split a "one per line" textarea into a clean array of strings. */
function linesToArray(value: unknown): string[] {
    return String(value ?? '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function EducationDialog({
    state,
    onClose,
}: {
    state: { education: Education | null } | null;
    onClose: () => void;
}) {
    if (!state) {
        return null;
    }

    const education = state.education;

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <Form
                    {...(education
                        ? admin.education.update.form(education.id)
                        : admin.education.store.form())}
                    transform={(data) => ({
                        ...data,
                        highlights: linesToArray(data.highlights),
                    })}
                    onSuccess={onClose}
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {education ? 'Edit' : 'New'} education
                                </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4 grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="degree">Degree</Label>
                                    <Input
                                        id="degree"
                                        name="degree"
                                        required
                                        defaultValue={education?.degree ?? ''}
                                    />
                                    <InputError message={errors.degree} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="institution">
                                        Institution
                                    </Label>
                                    <Input
                                        id="institution"
                                        name="institution"
                                        required
                                        defaultValue={
                                            education?.institution ?? ''
                                        }
                                    />
                                    <InputError message={errors.institution} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="start_year">
                                            Start year
                                        </Label>
                                        <Input
                                            id="start_year"
                                            name="start_year"
                                            defaultValue={
                                                education?.start_year ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.start_year}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="end_year">
                                            End year
                                        </Label>
                                        <Input
                                            id="end_year"
                                            name="end_year"
                                            defaultValue={
                                                education?.end_year ?? ''
                                            }
                                        />
                                        <InputError message={errors.end_year} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edu-highlights">
                                        Highlights (one per line)
                                    </Label>
                                    <Textarea
                                        id="edu-highlights"
                                        name="highlights"
                                        rows={4}
                                        defaultValue={(
                                            education?.highlights ?? []
                                        ).join('\n')}
                                    />
                                    <InputError message={errors.highlights} />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function CertificationDialog({
    state,
    onClose,
}: {
    state: { certification: Certification | null } | null;
    onClose: () => void;
}) {
    const [iconClass, setIconClass] = useState('');

    if (!state) {
        return null;
    }

    const certification = state.certification;

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <Form
                    {...(certification
                        ? admin.certifications.update.form(certification.id)
                        : admin.certifications.store.form())}
                    onSuccess={onClose}
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {certification ? 'Edit' : 'New'}{' '}
                                    certification
                                </DialogTitle>
                            </DialogHeader>

                            <div className="mt-4 grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="cert-name">Name</Label>
                                    <Input
                                        id="cert-name"
                                        name="name"
                                        required
                                        defaultValue={certification?.name ?? ''}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="issuer">Issuer</Label>
                                    <Input
                                        id="issuer"
                                        name="issuer"
                                        defaultValue={
                                            certification?.issuer ?? ''
                                        }
                                    />
                                    <InputError message={errors.issuer} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="cert-icon">
                                        Boxicons class
                                    </Label>
                                    <Input
                                        id="cert-icon"
                                        name="icon_class"
                                        defaultValue={
                                            certification?.icon_class ?? ''
                                        }
                                        onChange={(event) =>
                                            setIconClass(event.target.value)
                                        }
                                        placeholder="bx bxl-java"
                                    />
                                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <i
                                            className={
                                                iconClass ||
                                                certification?.icon_class ||
                                                'bx bx-certification'
                                            }
                                            aria-hidden="true"
                                        />
                                        Preview
                                    </span>
                                    <InputError message={errors.icon_class} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        name="year"
                                        defaultValue={certification?.year ?? ''}
                                    />
                                    <InputError message={errors.year} />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminEducation({ educations, certifications }: Props) {
    const [educationDialog, setEducationDialog] = useState<{
        education: Education | null;
    } | null>(null);
    const [certificationDialog, setCertificationDialog] = useState<{
        certification: Certification | null;
    } | null>(null);

    return (
        <>
            <Head title="Education & certifications" />

            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Education & certifications"
                    description="Shown side by side in the Background section."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
                            <CardTitle>Education</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setEducationDialog({ education: null })
                                }
                            >
                                <Plus />
                                Add
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {educations.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Nothing added yet.
                                </p>
                            ) : (
                                <ul className="divide-y">
                                    {educations.map((education) => (
                                        <li
                                            key={education.id}
                                            className="flex items-start justify-between gap-3 py-3 first:pt-0"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-medium">
                                                    {education.degree}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {education.institution}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {education.start_year} —{' '}
                                                    {education.end_year}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Edit ${education.degree}`}
                                                    onClick={() =>
                                                        setEducationDialog({
                                                            education,
                                                        })
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>

                                                <ConfirmDelete
                                                    action={admin.education.destroy.form(
                                                        education.id,
                                                    )}
                                                    label={education.degree}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
                            <CardTitle>Certifications</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setCertificationDialog({
                                        certification: null,
                                    })
                                }
                            >
                                <Plus />
                                Add
                            </Button>
                        </CardHeader>

                        <CardContent>
                            {certifications.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Nothing added yet.
                                </p>
                            ) : (
                                <ul className="divide-y">
                                    {certifications.map((certification) => (
                                        <li
                                            key={certification.id}
                                            className="flex items-start justify-between gap-3 py-3 first:pt-0"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-medium">
                                                    {certification.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {certification.issuer}
                                                    {certification.year
                                                        ? ` · ${certification.year}`
                                                        : ''}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Edit ${certification.name}`}
                                                    onClick={() =>
                                                        setCertificationDialog({
                                                            certification,
                                                        })
                                                    }
                                                >
                                                    <Pencil />
                                                </Button>

                                                <ConfirmDelete
                                                    action={admin.certifications.destroy.form(
                                                        certification.id,
                                                    )}
                                                    label={certification.name}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <EducationDialog
                state={educationDialog}
                onClose={() => setEducationDialog(null)}
            />
            <CertificationDialog
                state={certificationDialog}
                onClose={() => setCertificationDialog(null)}
            />
        </>
    );
}

AdminEducation.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Education & certs', href: admin.education.index() },
    ],
};
