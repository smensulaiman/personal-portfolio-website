import { Reveal } from '@/components/portfolio/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Certification, Education } from '@/types/portfolio';

type Props = {
    educations: Education[];
    certifications: Certification[];
};

export function BackgroundSection({ educations, certifications }: Props) {
    if (educations.length === 0 && certifications.length === 0) {
        return null;
    }

    return (
        <section
            id="background"
            className="scroll-mt-20"
            style={{
                borderTop: '1px solid var(--pf-rule)',
                backgroundColor: 'var(--pf-paper-alt)',
            }}
        >
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <SectionHeading
                    index="05"
                    label="Background"
                    title="Education & credentials"
                />

                <div className="grid gap-14 md:grid-cols-2 md:gap-16">
                    {educations.length > 0 ? (
                        <div>
                            <h3
                                className="pf-mono flex items-center gap-2.5 text-[0.65rem]"
                                style={{ color: 'var(--pf-ink-faint)' }}
                            >
                                <i
                                    className="bx bx-book text-base"
                                    style={{ color: 'var(--pf-seal)' }}
                                    aria-hidden="true"
                                />
                                Education
                            </h3>

                            <ul className="mt-6">
                                {educations.map((education, index) => (
                                    <Reveal
                                        as="li"
                                        key={education.id}
                                        delay={index * 70}
                                        className="py-6"
                                    >
                                        <div
                                            style={{
                                                borderTop:
                                                    '1px solid var(--pf-rule)',
                                            }}
                                            className="pt-6"
                                        >
                                            <p
                                                className="pf-mono text-[0.6rem]"
                                                style={{
                                                    color: 'var(--pf-ink-faint)',
                                                }}
                                            >
                                                {education.start_year} —{' '}
                                                {education.end_year}
                                            </p>

                                            <h4 className="pf-display mt-3 text-2xl">
                                                {education.degree}
                                            </h4>

                                            <p
                                                className="mt-1.5 text-sm"
                                                style={{
                                                    color: 'var(--pf-ink-soft)',
                                                }}
                                            >
                                                {education.institution}
                                            </p>

                                            <ul className="mt-4 space-y-2.5">
                                                {education.highlights.map(
                                                    (highlight, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex gap-2.5 text-sm leading-relaxed"
                                                            style={{
                                                                color: 'var(--pf-ink-soft)',
                                                            }}
                                                        >
                                                            <i
                                                                className="bx bx-award mt-0.5 text-base"
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
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {certifications.length > 0 ? (
                        <div>
                            <h3
                                className="pf-mono flex items-center gap-2.5 text-[0.65rem]"
                                style={{ color: 'var(--pf-ink-faint)' }}
                            >
                                <i
                                    className="bx bx-certification text-base"
                                    style={{ color: 'var(--pf-seal)' }}
                                    aria-hidden="true"
                                />
                                Certifications & training
                            </h3>

                            <ul className="mt-6">
                                {certifications.map((certification, index) => (
                                    <Reveal
                                        as="li"
                                        key={certification.id}
                                        delay={index * 70}
                                        className="py-6"
                                    >
                                        <div
                                            style={{
                                                borderTop:
                                                    '1px solid var(--pf-rule)',
                                            }}
                                            className="flex items-start justify-between gap-6 pt-6"
                                        >
                                            <div className="flex min-w-0 items-start gap-3.5">
                                                <span
                                                    className="flex size-10 shrink-0 items-center justify-center rounded-sm"
                                                    style={{
                                                        border: '1px solid var(--pf-rule)',
                                                        backgroundColor:
                                                            'var(--pf-paper)',
                                                    }}
                                                >
                                                    <i
                                                        className={`${certification.icon_class ?? 'bx bx-certification'} text-xl`}
                                                        style={{
                                                            color: 'var(--pf-seal)',
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                </span>

                                                <div className="min-w-0">
                                                    <h4 className="text-base leading-snug font-medium">
                                                        {certification.name}
                                                    </h4>

                                                    {certification.issuer ? (
                                                        <p
                                                            className="mt-1.5 text-sm"
                                                            style={{
                                                                color: 'var(--pf-ink-soft)',
                                                            }}
                                                        >
                                                            {
                                                                certification.issuer
                                                            }
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            {certification.year ? (
                                                <span
                                                    className="pf-mono shrink-0 text-[0.6rem]"
                                                    style={{
                                                        color: 'var(--pf-seal)',
                                                    }}
                                                >
                                                    {certification.year}
                                                </span>
                                            ) : null}
                                        </div>
                                    </Reveal>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
