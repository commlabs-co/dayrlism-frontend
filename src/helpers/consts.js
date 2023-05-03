import { getAge, getExperience } from "./tools";

export const routes = {
  home: "/",
  light: "/light",
  dark: "/dark",
};

export const menuItem = [
  { icon: "fa-home", menuName: "Home" },
  { icon: "fa-user", menuName: "About" },
  { icon: "fa-briefcase", menuName: "Portfolio" },
  { icon: "fa-envelope-open", menuName: "Contact" },
  { icon: "fa-comments", menuName: "Blog" },
];

export const heroContent = {
  heroImage: "img/hero/men.png",
  heroMobileImage: "men-mobile.png",
  heroTitleName: "dayrl lee",
  heroDesignation: "fullstack dev",
  heroDescriptions: `I can develop a fully functional web application/mobile application from backend(NodeJS) to the frontend(ReactJS, HTML5, etc), CI/CD(Jenkins), and manipulating cloud(DO, Google Cloud) and I'm still improving to the extends of AI, Blockchain, Big data, etc.`,
  heroBtn: "more about me",
};

export const personalInfoContent = [
  { meta: "first name", metaInfo: "Dayrl" },
  { meta: "last name", metaInfo: "Lee" },
  { meta: "Age", metaInfo: getAge("01/13/1994") },
  { meta: "Nationality", metaInfo: "Malaysia" },
  { meta: "Freelance", metaInfo: "Available" },
  { meta: "State", metaInfo: "KL" },
  { meta: "phone", metaInfo: "+60166727208" },
  { meta: "Email", metaInfo: "halo@dayrlism.info" },
  { meta: "Telegram", metaInfo: "dayrl10" },
  { meta: "langages", metaInfo: "English, Mandarin, Cantonese" },
];

export const achievementsContent = [
  { title: getExperience(), subTitle1: "years of", subTitle2: "experience" },
  { title: "97", subTitle1: "completed", subTitle2: "projects" },
  { title: "81", subTitle1: "Happy", subTitle2: "customers" },
  { title: "53", subTitle1: "skills", subTitle2: "posses" },
];

export const skillsContent = [
  { skillClass: "p92", skillPercent: "92", skillName: "FRONTEND(TS, REACT)" },
  { skillClass: "p85", skillPercent: "85", skillName: "BACKEND(TS, NODEJS)" },
  {
    skillClass: "p90",
    skillPercent: "90",
    skillName: "INFRASTRUCTURE PLANNING",
  },
  { skillClass: "p85", skillPercent: "85", skillName: "DEVOPS" },
];

export const experienceContent = [
  {
    year: "3/2021-Present",
    position: "SENIOR FULLSTACK DEVELOPER",
    compnayName: "Lottiefiles",
    details: ``,
  },
  {
    year: "5/2017-Present",
    position: "Senior Community Partner/Fullstack Software Engineer ",
    compnayName: "IM90S",
    details: ``,
  },
  {
    year: "01/2020-2/2021",
    position: "SENIOR FRONTEND DEVELOPER",
    compnayName: "Plus65 Interactive Pte Ltd",
    details: ``,
  },
  {
    year: "1/2019-01/2020",
    position: "FULLSTACK DEVELOPER",
    compnayName: "Rea Group Ltd ",
    details: ``,
  },
  {
    year: "03/2018-01/2019",
    position: "FULLSTACK DEVELOPER",
    compnayName: "Carsome Sdh Bhd",
    details: ``,
  },
  {
    year: "10/2017-11/2018",
    position: "SOFTWARE ENGINEER",
    compnayName: "Leet Entertainment",
    details: ``,
  },
  {
    year: "06/2015 — 10/2017",
    position: "SENIOR CREATIVE DEVELOPER",
    compnayName: "Inspired Mobile Sdh Bhd",
    details: ``,
  },
  {
    year: "09/2014 —06/2015",
    position: "MOBILE WEB APP DEVELOPER",
    compnayName: "Nettium Sdh Bhd ",
    details: ``,
  },
];

export const educationContent = [
  {
    year: "2021",
    degree: "NGINX Fundamentals for Super Users",
    institute: "Nginx",
    details: `Credential ID TLLKVHGZGT-SSWWXXMY-RHRKDFDHFJ`,
  },
  {
    year: "2018",
    degree: "Udemy: REACTJS, REDUX",
    institute: "Udemy",
    details: ``,
  },
  {
    year: "2016",
    degree: "Sololearn: JAVASCRIPT, HTML5, C#, SQL",
    institute: "Sololearn",
    details: `Credential ID 1014-1842058`,
  },
  {
    year: "2014",
    degree: "Certified Web Developer",
    institute: "Microsoft",
    details: ``,
  },
  {
    year: "2014",
    degree: "Diploma In Software Engineer",
    institute: "Asia Pacific University",
    details: ``,
  },
];
