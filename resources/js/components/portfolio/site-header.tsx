import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
    { id: 'profile', index: '01', label: 'Profile' },
    { id: 'expertise', index: '02', label: 'Expertise' },
    { id: 'experience', index: '03', label: 'Experience' },
    { id: 'work', index: '04', label: 'Work' },
    { id: 'background', index: '05', label: 'Background' },
    { id: 'contact', index: '06', label: 'Contact' },
];

type Props = {
    name: string;
    resumeUrl: string;
};

export function SiteHeader({ name, resumeUrl }: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('profile');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries
                    .filter((entry) => entry.isIntersecting)
                    .forEach((entry) => setActive(entry.target.id));
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);

            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const initials = name
        .replace(/[^\p{L}\s.]/gu, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(-2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-colors duration-300',
                scrolled && 'backdrop-blur-md',
            )}
            style={{
                backgroundColor: scrolled
                    ? 'color-mix(in srgb, var(--pf-paper) 88%, transparent)'
                    : 'transparent',
                borderBottom: `1px solid ${scrolled ? 'var(--pf-rule)' : 'transparent'}`,
            }}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:h-20 md:px-8">
                <a
                    href="#profile"
                    className="flex items-center gap-3"
                    aria-label={`${name} — back to top`}
                >
                    <span
                        className="pf-seal-mark flex size-9 items-center justify-center rounded-sm text-sm leading-none"
                        aria-hidden="true"
                    >
                        {initials}
                    </span>
                    <span className="pf-mono hidden text-xs sm:inline">
                        {name}
                    </span>
                </a>

                <nav className="hidden items-center gap-7 lg:flex">
                    {SECTIONS.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="pf-mono text-[0.65rem] transition-colors"
                            style={{
                                color:
                                    active === section.id
                                        ? 'var(--pf-seal)'
                                        : 'var(--pf-ink-soft)',
                            }}
                        >
                            <span style={{ opacity: 0.5 }}>
                                {section.index}
                            </span>{' '}
                            {section.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href={resumeUrl}
                        download
                        className="pf-mono inline-flex items-center gap-2 px-4 py-2.5 text-[0.65rem] transition-opacity hover:opacity-85"
                        style={{
                            backgroundColor: 'var(--pf-ink)',
                            color: 'var(--pf-paper)',
                        }}
                    >
                        <i
                            className="bx bx-download text-sm"
                            aria-hidden="true"
                        />
                        <span className="hidden sm:inline">Resume</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="inline-flex size-10 items-center justify-center lg:hidden"
                        aria-expanded={menuOpen}
                        aria-controls="pf-mobile-nav"
                        aria-label="Toggle navigation"
                    >
                        <i
                            className={cn(
                                'bx text-2xl',
                                menuOpen ? 'bx-x' : 'bx-menu',
                            )}
                            aria-hidden="true"
                        />
                    </button>
                </div>
            </div>

            {menuOpen ? (
                <nav
                    id="pf-mobile-nav"
                    className="lg:hidden"
                    style={{
                        backgroundColor: 'var(--pf-paper)',
                        borderTop: '1px solid var(--pf-rule)',
                    }}
                >
                    <ul className="mx-auto max-w-6xl px-5 py-2 md:px-8">
                        {SECTIONS.map((section) => (
                            <li
                                key={section.id}
                                style={{
                                    borderBottom: '1px solid var(--pf-rule)',
                                }}
                            >
                                <a
                                    href={`#${section.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-4 py-3.5"
                                >
                                    <span
                                        className="pf-mono text-[0.65rem]"
                                        style={{ color: 'var(--pf-seal)' }}
                                    >
                                        {section.index}
                                    </span>
                                    <span className="pf-display text-2xl">
                                        {section.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            ) : null}
        </header>
    );
}
