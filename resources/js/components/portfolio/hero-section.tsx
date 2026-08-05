import { Reveal } from '@/components/portfolio/reveal';
import type { Profile } from '@/types/portfolio';

type Props = {
    profile: Profile;
    resumeUrl: string;
    avatarUrl: string | null;
};

export function HeroSection({ profile, resumeUrl, avatarUrl }: Props) {
    const facts = [
        { icon: 'bx-map', label: 'Based in', value: profile.location },
        { icon: 'bx-envelope', label: 'Email', value: profile.email },
        { icon: 'bx-phone', label: 'Phone', value: profile.phone },
        { icon: 'bx-flag', label: 'Nationality', value: profile.nationality },
        {
            icon: 'bx-message-detail',
            label: 'Languages',
            value: profile.spoken_languages,
        },
    ].filter((fact) => Boolean(fact.value));

    const initials = profile.name
        .replace(/[^\p{L}\s.]/gu, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(-2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <section id="profile" className="relative overflow-hidden">
            <div
                className="pf-grid-bg pointer-events-none absolute inset-0"
                style={{
                    opacity: 0.5,
                    maskImage:
                        'radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)',
                }}
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-20 md:px-8 md:pt-24 md:pb-28">
                <div className="grid gap-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
                    <div>
                        <Reveal>
                            <h1 className="pf-display text-[clamp(3rem,9vw,6.5rem)]">
                                {profile.name}
                            </h1>
                        </Reveal>

                        <Reveal delay={140}>
                            <p
                                className="mt-5 max-w-xl text-lg leading-snug md:text-xl"
                                style={{ color: 'var(--pf-ink)' }}
                            >
                                {profile.headline}
                            </p>
                        </Reveal>

                        <Reveal delay={200}>
                            <p
                                className="pf-justify mt-6 max-w-2xl text-[0.95rem] leading-relaxed"
                                style={{ color: 'var(--pf-ink-soft)' }}
                            >
                                {profile.summary}
                            </p>
                        </Reveal>

                        <Reveal delay={260}>
                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                <a
                                    href="#work"
                                    className="pf-mono inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.65rem] transition-opacity hover:opacity-85"
                                    style={{
                                        backgroundColor: 'var(--pf-seal)',
                                        color: 'var(--pf-paper)',
                                    }}
                                >
                                    View selected work
                                    <i
                                        className="bx bx-right-arrow-alt text-base"
                                        aria-hidden="true"
                                    />
                                </a>

                                <a
                                    href={resumeUrl}
                                    download
                                    className="pf-mono inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.65rem] transition-colors"
                                    style={{
                                        border: '1px solid var(--pf-rule-strong)',
                                        color: 'var(--pf-ink)',
                                    }}
                                >
                                    <i
                                        className="bx bx-download text-base"
                                        aria-hidden="true"
                                    />
                                    Download resume
                                </a>

                                {profile.github_url ? (
                                    <a
                                        href={profile.github_url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="inline-flex size-12 items-center justify-center transition-colors"
                                        style={{
                                            border: '1px solid var(--pf-rule-strong)',
                                            color: 'var(--pf-ink)',
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
                                        className="inline-flex size-12 items-center justify-center transition-colors"
                                        style={{
                                            border: '1px solid var(--pf-rule-strong)',
                                            color: 'var(--pf-ink)',
                                        }}
                                        aria-label="LinkedIn profile"
                                    >
                                        <i
                                            className="bx bxl-linkedin-square text-xl"
                                            aria-hidden="true"
                                        />
                                    </a>
                                ) : null}
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={320}>
                        <div className="lg:pt-4">
                            <div className="flex items-start gap-5">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={profile.name}
                                        width={256}
                                        height={320}
                                        className="aspect-4/5 w-32 shrink-0 rounded-sm object-cover md:w-36"
                                        style={{
                                            border: '1px solid var(--pf-rule-strong)',
                                        }}
                                    />
                                ) : (
                                    <span
                                        className="pf-seal-mark flex size-20 shrink-0 items-center justify-center rounded-sm text-3xl leading-none"
                                        aria-hidden="true"
                                    >
                                        {initials}
                                    </span>
                                )}

                                <p
                                    className="pf-mono pt-1 text-[0.6rem] leading-relaxed"
                                    style={{ color: 'var(--pf-ink-faint)' }}
                                >
                                    Engineering
                                    <br />
                                    dossier
                                    <br />
                                    <span style={{ color: 'var(--pf-seal)' }}>
                                        {new Date().getFullYear()}
                                    </span>
                                </p>
                            </div>

                            <dl
                                className="mt-8"
                                style={{
                                    borderTop: '1px solid var(--pf-rule)',
                                }}
                            >
                                {facts.map((fact) => (
                                    <div
                                        key={fact.label}
                                        className="flex items-baseline gap-4 py-3"
                                        style={{
                                            borderBottom:
                                                '1px solid var(--pf-rule)',
                                        }}
                                    >
                                        <dt
                                            className="pf-mono flex w-28 shrink-0 items-center gap-2 text-[0.6rem]"
                                            style={{
                                                color: 'var(--pf-ink-faint)',
                                            }}
                                        >
                                            <i
                                                className={`bx ${fact.icon} text-sm`}
                                                aria-hidden="true"
                                            />
                                            {fact.label}
                                        </dt>
                                        <dd className="min-w-0 flex-1 text-sm break-words">
                                            {fact.label === 'Email' ? (
                                                <a
                                                    href={`mailto:${fact.value}`}
                                                    className="pf-link-underline"
                                                >
                                                    {fact.value}
                                                </a>
                                            ) : (
                                                fact.value
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
