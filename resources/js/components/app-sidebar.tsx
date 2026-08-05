import { Link } from '@inertiajs/react';
import {
    Award,
    Briefcase,
    ExternalLink,
    FolderKanban,
    LayoutGrid,
    Mail,
    UserRound,
    Wrench,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: admin.dashboard(), icon: LayoutGrid },
    { title: 'Profile', href: admin.profile.edit(), icon: UserRound },
    { title: 'Skills', href: admin.skills.index(), icon: Wrench },
    { title: 'Experience', href: admin.experiences.index(), icon: Briefcase },
    { title: 'Projects', href: admin.projects.index(), icon: FolderKanban },
    { title: 'Education & certs', href: admin.education.index(), icon: Award },
    { title: 'Messages', href: admin.messages.index(), icon: Mail },
];

const footerNavItems: NavItem[] = [
    { title: 'View live site', href: '/', icon: ExternalLink },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
