import { Head } from '@inertiajs/react';
import { BackgroundSection } from '@/components/portfolio/background-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { HeroSection } from '@/components/portfolio/hero-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { SiteFooter } from '@/components/portfolio/site-footer';
import { SiteHeader } from '@/components/portfolio/site-header';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { fileUrl } from '@/lib/utils';
import type {
    Certification,
    Education,
    Experience,
    Profile,
    Project,
    SkillCategory,
} from '@/types/portfolio';

type Props = {
    profile: Profile;
    skillCategories: SkillCategory[];
    experiences: Experience[];
    projects: Project[];
    educations: Education[];
    certifications: Certification[];
};

/** The docx bundled with the app is the fallback when nothing is uploaded. */
const FALLBACK_RESUME = '/Resume_of_Sulaiman.docx';

export default function Portfolio({
    profile,
    skillCategories,
    experiences,
    projects,
    educations,
    certifications,
}: Props) {
    const resumeUrl = fileUrl(profile.resume_path) ?? FALLBACK_RESUME;
    const avatarUrl = fileUrl(profile.avatar_path);

    return (
        <div className="pf-root min-h-screen">
            <Head title={profile.headline}>
                <meta name="description" content={profile.summary} />
                <meta
                    property="og:title"
                    content={`${profile.name} — ${profile.headline}`}
                />
                <meta property="og:description" content={profile.summary} />
                <meta property="og:type" content="profile" />
                <meta name="theme-color" content="#fbfaf7" />
            </Head>

            <a
                href="#profile"
                className="pf-mono sr-only text-xs focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
            >
                Skip to content
            </a>

            <SiteHeader name={profile.name} resumeUrl={resumeUrl} />

            <main>
                <HeroSection
                    profile={profile}
                    resumeUrl={resumeUrl}
                    avatarUrl={avatarUrl}
                />
                <SkillsSection categories={skillCategories} />
                <ExperienceSection experiences={experiences} />
                <ProjectsSection projects={projects} />
                <BackgroundSection
                    educations={educations}
                    certifications={certifications}
                />
                <ContactSection profile={profile} />
            </main>

            <SiteFooter profile={profile} />
        </div>
    );
}
