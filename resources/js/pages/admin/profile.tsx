import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { fileUrl } from '@/lib/utils';
import admin from '@/routes/admin';
import type { Profile } from '@/types/portfolio';

type Props = {
    profile: Profile;
};

const TEXT_FIELDS: {
    name: keyof Profile;
    label: string;
    type?: string;
    placeholder?: string;
}[] = [
    { name: 'name', label: 'Full name', placeholder: 'MD. Sulaiman' },
    {
        name: 'headline',
        label: 'Headline',
        placeholder: 'Full-Stack Software Engineer',
    },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone' },
    { name: 'location', label: 'Location' },
    { name: 'nationality', label: 'Nationality' },
    {
        name: 'spoken_languages',
        label: 'Spoken languages',
        placeholder: 'English, Bangla',
    },
    { name: 'birth_date', label: 'Date of birth', type: 'date' },
    { name: 'github_url', label: 'GitHub URL', type: 'url' },
    { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
];

export default function AdminProfile({ profile }: Props) {
    return (
        <>
            <Head title="Profile" />

            <div className="flex flex-col gap-6 p-4">
                <Heading
                    title="Profile"
                    description="The identity block shown in the portfolio hero and footer."
                />

                <Form
                    {...admin.profile.update.form()}
                    options={{ preserveScroll: true }}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-5 md:grid-cols-2">
                                    {TEXT_FIELDS.map((field) => (
                                        <div
                                            key={field.name}
                                            className="grid gap-2"
                                        >
                                            <Label htmlFor={field.name}>
                                                {field.label}
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type ?? 'text'}
                                                placeholder={field.placeholder}
                                                defaultValue={
                                                    (profile[
                                                        field.name
                                                    ] as string) ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors[field.name]}
                                            />
                                        </div>
                                    ))}

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="summary">
                                            Professional summary
                                        </Label>
                                        <Textarea
                                            id="summary"
                                            name="summary"
                                            rows={6}
                                            defaultValue={profile.summary}
                                        />
                                        <InputError message={errors.summary} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Files</CardTitle>
                                </CardHeader>

                                <CardContent className="grid gap-5 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="avatar">
                                            Profile photo
                                        </Label>
                                        <Input
                                            id="avatar"
                                            name="avatar"
                                            type="file"
                                            accept="image/*"
                                        />
                                        <InputError message={errors.avatar} />
                                        {profile.avatar_path && (
                                            <a
                                                href={
                                                    fileUrl(
                                                        profile.avatar_path,
                                                    ) ?? '#'
                                                }
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="text-sm text-muted-foreground underline"
                                            >
                                                Current photo
                                            </a>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="resume">
                                            Resume (PDF or Word)
                                        </Label>
                                        <Input
                                            id="resume"
                                            name="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <InputError message={errors.resume} />
                                        <a
                                            href={
                                                fileUrl(profile.resume_path) ??
                                                '/Resume_of_Sulaiman.docx'
                                            }
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="text-sm text-muted-foreground underline"
                                        >
                                            Current resume
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <Button disabled={processing}>
                                    {processing && <Spinner />}
                                    Save profile
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

AdminProfile.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Profile', href: admin.profile.edit() },
    ],
};
