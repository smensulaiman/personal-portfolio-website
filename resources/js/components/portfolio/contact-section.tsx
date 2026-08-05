import { Reveal } from '@/components/portfolio/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Profile } from '@/types/portfolio';

type Props = {
    profile: Profile;
};

export function ContactSection({ profile }: Props) {
    const channels = [
        profile.email
            ? {
                  icon: 'bx bx-envelope',
                  label: 'Email',
                  value: profile.email,
                  href: `mailto:${profile.email}`,
              }
            : null,
        profile.phone
            ? {
                  icon: 'bx bx-phone',
                  label: 'Phone',
                  value: profile.phone,
                  href: `tel:${profile.phone.replace(/\s/g, '')}`,
              }
            : null,
        profile.github_url
            ? {
                  icon: 'bx bxl-github',
                  label: 'GitHub',
                  value: profile.github_url.replace(/^https?:\/\//, ''),
                  href: profile.github_url,
              }
            : null,
        profile.linkedin_url
            ? {
                  icon: 'bx bxl-linkedin-square',
                  label: 'LinkedIn',
                  value: profile.linkedin_url.replace(/^https?:\/\//, ''),
                  href: profile.linkedin_url,
              }
            : null,
    ].filter((channel) => channel !== null);

    return (
        <section
            id="contact"
            className="scroll-mt-20"
            style={{ borderTop: '1px solid var(--pf-rule)' }}
        >
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <SectionHeading
                    index="06"
                    label="Contact"
                    title="Start a conversation"
                    description="Open to engineering roles and selected freelance work. Email is the fastest way to reach me."
                />

                {/*
                    Each card carries its own 1px ring rather than relying on a
                    coloured grid background, so the hairlines stay correct
                    however many channels are filled in.
                */}
                <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                    {channels.map((channel, index) => (
                        <Reveal
                            key={channel.label}
                            delay={index * 60}
                            className="h-full"
                        >
                            <a
                                href={channel.href}
                                target={
                                    channel.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                }
                                rel="noreferrer noopener"
                                className="group flex h-full items-center gap-4 px-5 py-6 md:px-6"
                                style={{
                                    backgroundColor: 'var(--pf-paper)',
                                    boxShadow: '0 0 0 1px var(--pf-rule)',
                                }}
                            >
                                <i
                                    className={`${channel.icon} text-2xl`}
                                    style={{ color: 'var(--pf-seal)' }}
                                    aria-hidden="true"
                                />

                                <span className="min-w-0 flex-1">
                                    <span
                                        className="pf-mono block text-[0.6rem]"
                                        style={{
                                            color: 'var(--pf-ink-faint)',
                                        }}
                                    >
                                        {channel.label}
                                    </span>
                                    <span className="mt-1 block truncate text-sm">
                                        {channel.value}
                                    </span>
                                </span>

                                <i
                                    className="bx bx-right-arrow-alt text-lg transition-transform group-hover:translate-x-1"
                                    style={{ color: 'var(--pf-ink-faint)' }}
                                    aria-hidden="true"
                                />
                            </a>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={channels.length * 60}>
                    <div className="mt-10">
                        <a
                            href={`mailto:${profile.email}`}
                            className="pf-mono inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.65rem] transition-opacity hover:opacity-85"
                            style={{
                                backgroundColor: 'var(--pf-seal)',
                                color: 'var(--pf-paper)',
                            }}
                        >
                            <i
                                className="bx bx-envelope text-base"
                                aria-hidden="true"
                            />
                            Email me
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
