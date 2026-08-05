import { Reveal } from '@/components/portfolio/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { SkillCategory } from '@/types/portfolio';

type Props = {
    categories: SkillCategory[];
};

export function SkillsSection({ categories }: Props) {
    if (categories.length === 0) {
        return null;
    }

    return (
        <section
            id="expertise"
            className="scroll-mt-20"
            style={{ borderTop: '1px solid var(--pf-rule)' }}
        >
            <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
                <SectionHeading
                    index="02"
                    label="Expertise"
                    title="Skill"
                    description="Production experience across the stack — from agentic AI-assisted delivery down to the Linux boxes the systems run on."
                />

                {/*
                    Each card carries its own 1px ring rather than relying on a
                    coloured grid background, so the hairlines stay correct
                    however many categories exist — an incomplete final row
                    would otherwise leave a solid block of rule colour.
                */}
                <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <Reveal
                            key={category.id}
                            delay={index * 50}
                            className="h-full"
                        >
                            <div
                                className="h-full px-5 py-5 md:px-6"
                                style={{
                                    backgroundColor: 'var(--pf-paper)',
                                    boxShadow: '0 0 0 1px var(--pf-rule)',
                                }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <i
                                        className={`${category.icon_class ?? 'bx bx-code-alt'} text-lg`}
                                        style={{ color: 'var(--pf-seal)' }}
                                        aria-hidden="true"
                                    />
                                    <h3 className="pf-mono text-[0.65rem]">
                                        {category.name}
                                    </h3>
                                </div>

                                <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
                                    {category.skills.map((skill) => (
                                        <li
                                            key={skill.id}
                                            className="flex items-center gap-1.5 text-[0.8rem]"
                                            style={{
                                                color: 'var(--pf-ink-soft)',
                                            }}
                                        >
                                            <i
                                                className={`${skill.icon_class ?? 'bx bx-chevron-right'} text-sm`}
                                                style={{
                                                    color: 'var(--pf-ink-faint)',
                                                }}
                                                aria-hidden="true"
                                            />
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
