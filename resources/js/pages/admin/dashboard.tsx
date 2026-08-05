import { Head, Link } from '@inertiajs/react';
import {
    Award,
    Briefcase,
    ExternalLink,
    FolderKanban,
    Mail,
    Star,
    Wrench,
} from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import admin from '@/routes/admin';
import type { ContactMessage } from '@/types/portfolio';

type Props = {
    stats: {
        projects: number;
        featuredProjects: number;
        skills: number;
        experiences: number;
        certifications: number;
        unreadMessages: number;
    };
    recentMessages: ContactMessage[];
};

export default function AdminDashboard({ stats, recentMessages }: Props) {
    const tiles = [
        {
            label: 'Projects',
            value: stats.projects,
            icon: FolderKanban,
            href: admin.projects.index(),
        },
        {
            label: 'Featured',
            value: stats.featuredProjects,
            icon: Star,
            href: admin.projects.index(),
        },
        {
            label: 'Skills',
            value: stats.skills,
            icon: Wrench,
            href: admin.skills.index(),
        },
        {
            label: 'Experience',
            value: stats.experiences,
            icon: Briefcase,
            href: admin.experiences.index(),
        },
        {
            label: 'Certifications',
            value: stats.certifications,
            icon: Award,
            href: admin.education.index(),
        },
        {
            label: 'Unread messages',
            value: stats.unreadMessages,
            icon: Mail,
            href: admin.messages.index(),
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Portfolio admin"
                        description="Everything on the public site is edited from here."
                    />

                    <Button variant="outline" asChild>
                        <a href="/" target="_blank" rel="noreferrer noopener">
                            <ExternalLink />
                            View live site
                        </a>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tiles.map((tile) => (
                        <Link key={tile.label} href={tile.href}>
                            <Card className="transition-colors hover:border-primary/40">
                                <CardHeader>
                                    <CardDescription className="flex items-center gap-2">
                                        <tile.icon className="size-4" />
                                        {tile.label}
                                    </CardDescription>
                                    <CardTitle className="text-3xl">
                                        {tile.value}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent messages</CardTitle>
                        <CardDescription>
                            The latest enquiries submitted through the contact
                            form.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {recentMessages.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No messages yet.
                            </p>
                        ) : (
                            <ul className="divide-y">
                                {recentMessages.map((message) => (
                                    <li
                                        key={message.id}
                                        className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                                    >
                                        <div className="min-w-0">
                                            <p className="flex items-center gap-2 text-sm font-medium">
                                                {message.name}
                                                {!message.read_at && (
                                                    <Badge variant="secondary">
                                                        New
                                                    </Badge>
                                                )}
                                            </p>
                                            <p className="truncate text-sm text-muted-foreground">
                                                {message.subject ??
                                                    message.message}
                                            </p>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={admin.messages.index()}>
                                                Open
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: admin.dashboard() }],
};
