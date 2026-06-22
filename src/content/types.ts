// Typed shape of the single source of truth for Dayrl Lee's profile.
// Consumed by both the portfolio (`src/helpers/consts.ts`) and the résumé
// page (`src/pages/resume.tsx`) so career data is defined exactly once.

export interface ContactInfo {
  email: string;
  emailsAlt?: string[];
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  telegram?: string;
}

export interface SkillBar {
  name: string;
  /** 0–100; maps to the theme's `.pNN` circular-progress classes. */
  level: number;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  country?: string;
  achievements?: string[];
}

export interface EducationItem {
  degree: string;
  institute: string;
  period: string;
  details?: string;
}

export interface CertificateItem {
  name: string;
  detail?: string;
  period?: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
}

export interface ProjectItem {
  name: string;
  url?: string;
  period?: string;
}

export interface ReferenceItem {
  name: string;
  role: string;
  contact?: string;
}

export interface SocialLink {
  /** Full Font Awesome class, e.g. "fa fa-linkedin". */
  icon: string;
  url: string;
}

export interface CryptoAddress {
  icon: string;
  label: string;
  address: string;
}

export interface StatItem {
  value: string;
  label1: string;
  label2: string;
}

export interface Profile {
  name: string;
  fullName: string;
  title: string;
  headline: string;
  summary: string;
  /** MM/DD/YYYY, used to derive age. */
  birthDate: string;
  /** First professional year, used to derive years of experience. */
  careerStartYear: number;
  nationality: string;
  availability: string;
  languagesSpoken: string;
  contact: ContactInfo;
  skillBars: SkillBar[];
  techSkills: string[];
  skills: string[];
  experience: ExperienceItem[];
  volunteer: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  languages: LanguageItem[];
  interests: string[];
  projects: ProjectItem[];
  references: ReferenceItem[];
  social: SocialLink[];
  crypto: CryptoAddress[];
  stats: StatItem[];
}
