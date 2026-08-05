import type { Profile } from '@/types/portfolio';

type Props = {
    profile: Profile;
};

export function SiteFooter({ profile }: Props) {
    return (
        <footer
            style={{
                borderTop: '1px solid var(--pf-rule)',
                backgroundColor: 'var(--pf-ink)',
                color: 'var(--pf-paper)',
            }}
        >
            <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="pf-display text-4xl md:text-5xl">
                            {profile.name}
                        </p>
                        <p
                            className="pf-mono mt-3 text-[0.6rem]"
                            style={{ opacity: 0.65 }}
                        >
                            {profile.headline}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {profile.github_url ? (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex size-11 items-center justify-center transition-opacity hover:opacity-70"
                                style={{
                                    border: '1px solid rgba(251, 250, 247, 0.25)',
                                }}
                                aria-label="GitHub profile"
                            >
                                <i
                                    className="bx bxl-github text-xl"
                                    aria-hidden="true"
                                />
                            </a>
                        ) : null}

                        {profile.linkedin_url ? (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex size-11 items-center justify-center transition-opacity hover:opacity-70"
                                style={{
                                    border: '1px solid rgba(251, 250, 247, 0.25)',
                                }}
                                aria-label="LinkedIn profile"
                            >
                                <i
                                    className="bx bxl-linkedin-square text-xl"
                                    aria-hidden="true"
                                />
                            </a>
                        ) : null}

                        <a
                            href={`mailto:${profile.email}`}
                            className="inline-flex size-11 items-center justify-center transition-opacity hover:opacity-70"
                            style={{
                                border: '1px solid rgba(251, 250, 247, 0.25)',
                            }}
                            aria-label="Send an email"
                        >
                            <i
                                className="bx bx-envelope text-xl"
                                aria-hidden="true"
                            />
                        </a>

                        <a
                            href="#profile"
                            className="pf-mono inline-flex items-center gap-2 px-5 py-3.5 text-[0.6rem] transition-opacity hover:opacity-70"
                            style={{
                                border: '1px solid rgba(251, 250, 247, 0.25)',
                            }}
                        >
                            <i
                                className="bx bx-up-arrow-alt text-base"
                                aria-hidden="true"
                            />
                            Back to top
                        </a>
                    </div>
                </div>

                <div
                    className="mt-12 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderTop: '1px solid rgba(251, 250, 247, 0.15)' }}
                >
                    <p
                        className="pf-mono text-[0.6rem]"
                        style={{ opacity: 0.6 }}
                    >
                        © {new Date().getFullYear()} {profile.name}
                    </p>

                    <p
                        className="pf-mono text-[0.6rem]"
                        style={{ opacity: 0.6 }}
                    >
                        Built with Laravel, Inertia & React
                    </p>
                </div>
            </div>
        </footer>
    );
}
