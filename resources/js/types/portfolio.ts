export type Profile = {
    id: number;
    name: string;
    headline: string;
    summary: string;
    email: string;
    phone: string | null;
    location: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    nationality: string | null;
    spoken_languages: string | null;
    birth_date: string | null;
    avatar_path: string | null;
    resume_path: string | null;
};

export type Skill = {
    id: number;
    skill_category_id: number;
    name: string;
    icon_class: string | null;
    sort_order: number;
};

export type SkillCategory = {
    id: number;
    name: string;
    icon_class: string | null;
    sort_order: number;
    skills: Skill[];
};

export type Experience = {
    id: number;
    company: string;
    location: string | null;
    role: string;
    subtitle: string | null;
    start_date: string;
    end_date: string | null;
    highlights: string[];
    sort_order: number;
};

export type ProjectLink = {
    label: string;
    url: string;
};

export type Project = {
    id: number;
    name: string;
    description: string;
    category: string | null;
    tech: string[];
    links: ProjectLink[];
    featured: boolean;
    sort_order: number;
};

export type Education = {
    id: number;
    institution: string;
    degree: string;
    start_year: string | null;
    end_year: string | null;
    highlights: string[];
    sort_order: number;
};

export type Certification = {
    id: number;
    name: string;
    issuer: string | null;
    icon_class: string | null;
    year: string | null;
    sort_order: number;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    read_at: string | null;
    created_at: string;
};
