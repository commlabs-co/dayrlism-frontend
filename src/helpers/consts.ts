import { getAge, getExperience } from "./tools";
import heroImgMobile from "../../public/assets/img/hero/men-mobile.png";
import { profile } from "../content/profile";

// Portfolio-facing view models. All career data is derived from the single
// source of truth in `src/content/profile.ts`; only presentation-specific
// arrays (nav, hero copy) live here.

export const menuItem = [
  { icon: "fa-home", menuName: "Home" },
  { icon: "fa-user", menuName: "About" },
  { icon: "fa-envelope-open", menuName: "Contact" },
  { icon: "fa-terminal", menuName: "Version" },
];

export const heroContent = {
  heroImage: "/assets/img/hero/men.png",
  heroMobileImage: heroImgMobile,
  heroTitleName: profile.name.toLowerCase(),
  heroDesignation: "fullstack dev",
  heroDescriptions: profile.summary,
  heroBtn: "more about me",
};

export const personalInfoContent = [
  { meta: "first name", metaInfo: "Dayrl" },
  { meta: "last name", metaInfo: "Lee" },
  { meta: "Age", metaInfo: getAge(profile.birthDate) },
  { meta: "Nationality", metaInfo: profile.nationality },
  { meta: "Freelance", metaInfo: profile.availability },
  { meta: "State", metaInfo: "KL" },
  { meta: "phone", metaInfo: profile.contact.phone },
  { meta: "Email", metaInfo: profile.contact.emailsAlt?.[0] ?? profile.contact.email },
  { meta: "Telegram", metaInfo: profile.contact.telegram ?? "" },
  { meta: "langages", metaInfo: profile.languagesSpoken },
];

export const achievementsContent = [
  {
    title: String(getExperience(profile.careerStartYear)),
    subTitle1: "years of",
    subTitle2: "experience",
  },
  ...profile.stats.map((stat) => ({
    title: stat.value,
    subTitle1: stat.label1,
    subTitle2: stat.label2,
  })),
];

export const skillsContent = profile.skillBars.map((skill) => ({
  skillClass: `p${skill.level}`,
  skillPercent: String(skill.level),
  skillName: skill.name.toUpperCase(),
}));

export const experienceContent = profile.experience.map((item) => ({
  year: item.period,
  position: item.title.toUpperCase(),
  compnayName: item.company,
  details: "",
}));

export const educationContent = [
  ...profile.education.map((item) => ({
    year: item.period,
    degree: item.degree,
    institute: item.institute,
    details: item.details ?? "",
  })),
  ...profile.certificates.map((item) => ({
    year: item.period ?? "",
    degree: item.name,
    institute: item.detail ?? "",
    details: "",
  })),
];

export const SocialShare = profile.social.map((item) => ({
  iconName: item.icon,
  link: item.url,
}));

export const SponsorShare = profile.crypto.map((item) => ({
  iconName: item.icon,
  token: item.label,
  link: item.address,
}));
