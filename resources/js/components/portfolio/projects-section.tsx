import { Reveal } from '@/components/portfolio/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Project, ProjectLink } from '@/types/portfolio';

type Props = {
    projects: Project[];
};

/**
 * Pick a Boxicons class that matches where the link points.
 */
function iconForLink(link: ProjectLink): string {
    if (link.url.includes('play.google.com')) {
        return 'bx bxl-play-store';
    }

    if (link.url.includes('apps.apple.com')) {
        return 'bx bxl-apple';
    }

    return 'bx bx-link-external';
}

export function ProjectsSection({ projects }: Props) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <section
            id="work"
            className="scroll-mt-20"
            style={{ borderTop: '1px solid var(--pf-rule)' }}
        >
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <SectionHeading
                    index="04"
                    label="Work"
                    title="Projects"
                    description="Business platforms in daily production use, plus a long tail of mobile apps shipped to Google Play and the App Store."
                />

                {/*
                    Each card carries its own 1px ring rather than relying on a
                    coloured grid background, so the hairlines stay correct
                    however many projects exist.
                */}
                <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <Reveal
                            as="article"
                            key={project.id}
                            delay={(index % 3) * 60}
                            className="h-full"
                        >
                            <div
                                className="flex h-full flex-col px-5 py-6 md:px-6"
                                style={{
                                    backgroundColor: 'var(--pf-paper)',
                                    boxShadow: '0 0 0 1px var(--pf-rule)',
                                }}
                            >
                                <div
                                    className="h-px w-8"
                                    style={{
                                        backgroundColor: 'var(--pf-seal)',
                                    }}
                                    aria-hidden="true"
                                />

                                {project.category ? (
                                    <p
                                        className="pf-mono mt-4 text-[0.6rem]"
                                        style={{ color: 'var(--pf-ink-faint)' }}
                                    >
                                        {project.category}
                                    </p>
                                ) : null}

                                <h3 className="pf-display mt-2 text-2xl">
                                    {project.name}
                                </h3>

                                <p
                                    className="pf-justify mt-3 text-sm leading-relaxed"
                                    style={{ color: 'var(--pf-ink-soft)' }}
                                >
                                    {project.description}
                                </p>

                                {project.tech.length > 0 ? (
                                    <ul className="mt-4 flex flex-wrap gap-1.5">
                                        {project.tech.map((item) => (
                                            <li
                                                key={item}
                                                className="pf-mono px-2 py-0.5 text-[0.55rem]"
                                                style={{
                                                    border: '1px solid var(--pf-rule-strong)',
                                                    color: 'var(--pf-ink-soft)',
                                                }}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}

                                {project.links.length > 0 ? (
                                    <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-5">
                                        {project.links.map((link) => (
                                            <li key={link.url}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="pf-mono inline-flex items-center gap-1.5 text-[0.6rem]"
                                                    style={{
                                                        color: 'var(--pf-seal)',
                                                    }}
                                                >
                                                    <i
                                                        className={`${iconForLink(link)} text-sm`}
                                                        aria-hidden="true"
                                                    />
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
