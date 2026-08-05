import { Reveal } from '@/components/portfolio/reveal';

type Props = {
    /** Two-digit index shown in the accent colour, e.g. "02". */
    index: string;
    label: string;
    /** Optional serif title. Without it the label carries the heading. */
    title?: string;
    description?: string;
};

/**
 * Numbered section header: a monospaced index and label above a serif title,
 * with a hairline rule running out to the edge of the grid.
 */
export function SectionHeading({ index, label, title, description }: Props) {
    // Keep exactly one <h2> per section so the document outline stays intact
    // whether or not a serif title is supplied.
    const Label = title ? 'span' : 'h2';

    return (
        <Reveal className={title || description ? 'mb-12 md:mb-16' : 'mb-10'}>
            <div className="flex items-center gap-4">
                <span
                    className="pf-mono text-xs"
                    style={{ color: 'var(--pf-seal)' }}
                >
                    {index}
                </span>
                <Label
                    className="pf-mono text-xs"
                    style={{ color: 'var(--pf-ink-faint)' }}
                >
                    {label}
                </Label>
                <span
                    className="h-px flex-1"
                    style={{ backgroundColor: 'var(--pf-rule)' }}
                />
            </div>

            {title ? (
                <h2 className="pf-display mt-5 text-4xl sm:text-5xl md:text-6xl">
                    {title}
                </h2>
            ) : null}

            {description ? (
                <p
                    className="pf-justify mt-4 max-w-2xl text-base leading-relaxed"
                    style={{ color: 'var(--pf-ink-soft)' }}
                >
                    {description}
                </p>
            ) : null}
        </Reveal>
    );
}
