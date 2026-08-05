import { Reveal } from '@/components/portfolio/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Experience } from '@/types/portfolio';

type Props = {
    experiences: Experience[];
};

export function ExperienceSection({ experiences }: Props) {
    if (experiences.length === 0) {
        return null;
    }

    return (
        <section
            id="experience"
            className="scroll-mt-20"
            style={{
                borderTop: '1px solid var(--pf-rule)',
                backgroundColor: 'var(--pf-paper-alt)',
            }}
        >
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <SectionHeading index="03" label="Experience" />

                <ol className="mt-4">
                    {experiences.map((experience, index) => {
                        const current = !experience.end_date;

                        return (
                            <Reveal
                                as="li"
                                key={experience.id}
                                delay={index * 80}
                                className="relative grid gap-6 py-10 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-12"
                            >
                                <div
                                    className="absolute inset-x-0 top-0 h-px"
                                    style={{
                                        backgroundColor: 'var(--pf-rule)',
                                    }}
                                    aria-hidden="true"
                                />

                                <div>
                                    <p className="pf-mono flex items-center gap-2 text-[0.65rem]">
                                        <span
                                            className="size-1.5 rounded-full"
                                            style={{
                                                backgroundColor: current
                                                    ? 'var(--pf-seal)'
                                                    : 'var(--pf-ink-faint)',
                                            }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            style={{
                                                color: current
                                                    ? 'var(--pf-seal)'
                                                    : 'var(--pf-ink-faint)',
                                            }}
                                        >
                                            {experience.start_date} —{' '}
                                            {experience.end_date ?? 'Present'}
                                        </span>
                                    </p>

                                    {experience.location ? (
                                        <p
                                            className="mt-3 flex items-center gap-2 text-xs"
                                            style={{
                                                color: 'var(--pf-ink-faint)',
                                            }}
                                        >
                                            <i
                                                className="bx bx-map text-sm"
                                                aria-hidden="true"
                                            />
                                            {experience.location}
                                        </p>
                                    ) : null}
                                </div>

                                <div>
                                    <h3 className="pf-display text-3xl md:text-4xl">
                                        {experience.company}
                                    </h3>

                                    <p
                                        className="mt-1.5 text-sm font-medium"
                                        style={{ color: 'var(--pf-ink)' }}
                                    >
                                        {experience.role}
                                    </p>

                                    {experience.subtitle ? (
                                        <p
                                            className="mt-1 text-xs"
                                            style={{
                                                color: 'var(--pf-ink-faint)',
                                            }}
                                        >
                                            {experience.subtitle}
                                        </p>
                                    ) : null}

                                    <ul className="mt-6 space-y-3.5">
                                        {experience.highlights.map(
                                            (highlight, highlightIndex) => (
                                                <li
                                                    key={highlightIndex}
                                                    className="flex gap-3 text-sm leading-relaxed"
                                                    style={{
                                                        color: 'var(--pf-ink-soft)',
                                                    }}
                                                >
                                                    <i
                                                        className="bx bx-chevron-right mt-0.5 text-base"
                                                        style={{
                                                            color: 'var(--pf-seal)',
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="pf-justify min-w-0 flex-1">
                                                        {highlight}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
