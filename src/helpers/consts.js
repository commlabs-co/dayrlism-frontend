import { getAge, getExperience } from "./tools";
import heroImgMobile from "../../public/assets/img/hero/men-mobile.png";

export const routes = {
  home: "/",
  light: "/light",
  dark: "/dark",
};

export const menuItem = [
  { icon: "fa-home", menuName: "Home" },
  { icon: "fa-user", menuName: "About" },
  // { icon: "fa-briefcase", menuName: "Portfolio" },
  { icon: "fa-envelope-open", menuName: "Contact" },
  // { icon: "fa-comments", menuName: "Blog" },
  { icon: "fa-terminal", menuName: "Version" },
];

export const heroContent = {
  heroImage: "/assets/img/hero/men.png",
  heroMobileImage: heroImgMobile,
  heroTitleName: "dayrl lee",
  heroDesignation: "fullstack dev",
  heroDescriptions: `With a passion for delivering high-quality, user-friendly web and mobile applications, I offer expert full-stack development services. My expertise in technologies like Node.js, React.js, and HTML5, along with my proficiency in DevOps practices and cloud computing, enable me to bring your ideas to life. I am constantly pushing the boundaries of my abilities and exploring new technologies, including AI, Blockchain, and Big Data, to bring even more value to your project.`,
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
  { skillClass: "p95", skillPercent: "95", skillName: "FRONTEND(TS, REACT)" },
  { skillClass: "p90", skillPercent: "90", skillName: "BACKEND(TS, NODEJS)" },
  {
    skillClass: "p95",
    skillPercent: "95",
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
    compnayName: "Commlabs",
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

export const SocialShare = [
  {
    iconName: "fa fa-facebook",
    link: "https://www.facebook.com/dayrl10",
  },
  {
    iconName: "fa fa-instagram",
    link: "https://www.instagram.com/dayrlism10",
  },
  { iconName: "fa fa-twitter", link: "https://twitter.com/dayrl10" },
  { iconName: "fa fa-linkedin", link: "https://www.linkedin.com/in/dayrl10" },
  { iconName: "fa fa-whatsapp", link: "https://wa.me/60183663236" },
];

export const SponsorShare = [
  {
    iconName: "fa fa-bitcoin",
    token: "Bitcoin",
    link: "bc1qpafyqx84jg5y5apznjvz8d54u8zy7zk90wr7l4",
  },
  {
    iconName: "fa fa-usd",
    token: "Ethereum ERC20 USDT",
    link: "0xcd61bF0C222d9070fe264c98d5222152475997c0",
  },
  {
    iconName: "fa fa-usd",
    token: "Algorand USDT",
    link: "JZXQQVLQDV7G7INSYIHJAC7EW3533QK2LPEKG5BWBJ5EHONV4PZ7NN3HIE",
  },
];

import React from "react";
import {
  TeamOutlined,
  UsergroupAddOutlined,
  ProfileOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CrownOutlined,
  AimOutlined,
  SkypeOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

// immutable
const whiteColor = "#fff";
export const color = {
  primary: "#4DA6BD",
  secondary: "#0F4C5C",
  navMenu: "#0F4C5C",
  navSideMenuText: "#9a9fbf",
  containerBackground: whiteColor,
  navTextColor: whiteColor,
  communityTimeStamp: "#ccc",
  communityStar: "rgba(0, 0, 0, 0.45)",
  primaryTransparentColor: "rgba(77, 105, 136, 0.95)",
  whiteText: whiteColor,
};

export const font = {
  primary: '"Roboto", "Helvetica", "Arial", sans-serif',
};

export const messages = {
  errors: {
    login: "ID or password mismatch",
  },
};

const PREFIXED_URI = "/app";

export const menu = [
  {
    text: "Home",
    Icon: (prop) => <TeamOutlined {...prop} />,
    url: `${PREFIXED_URI}/home`,
  },
  {
    text: "Website",
    Icon: (prop) => <UsergroupAddOutlined {...prop} />,
    url: `${PREFIXED_URI}/website`,
  },
];

export const dropDownHeadeMenu = [
  {
    text: "Profile",
    Icon: (prop) => <UserOutlined {...prop} />,
    url: `${PREFIXED_URI}/profile`,
  },
  {
    text: "Settings",
    Icon: (prop) => <ProfileOutlined {...prop} />,
    url: `${PREFIXED_URI}/setting`,
  },
];

export const UPLOADMEDIUM = { avatar: "avatar", banner: "banner" };

export const badgesDetails = {
  register: {
    badgesAvatar: "b1",
    title: "Register Success",
  },
  login: {
    badgesAvatar: "b2",
    title: "Login Success",
  },
  completeProfileDetails: {
    badgesAvatar: "b3",
    title: "Complete Profile Details",
  },
  completeProfile: {
    badgesAvatar: "b4",
    title: "Update Banner Avatars",
  },
  followComm: {
    badgesAvatar: "b5",
    title: "Follow at least 2 Communities",
  },
  postPoint: {
    badgesAvatar: "b6",
    title: "Posts Points",
  },
  followerPoint: {
    badgesAvatar: "b7",
    title: "Followers Points",
  },
};

export const types = { one: "one", two: "two", three: "three", four: "four" };
export const titles = {
  languages: "languages",
  education: "education",
  references: "references",
  organizations: "organizations",
  certificates: "certificates",
};
export const titleAchievements = "Tasks/Achievements";
export const details = {
  name: "Dayrl Lee Pui Shin",
  title: "Fullstack NodeJS Developer",
  bios: "I can develop a fully functional web application/mobile application from backend(NodeJS) to the frontend(ReactJS, HTML5, etc), CI/CD(Jenkins), and manipulating cloud(DO, Google Cloud) and I'm still improving to the extends of AI, Blockchain, Big data, etc.",
  personalInfo: [
    {
      icon: <MailOutlined />,
      text: "dayrl94@gmail.com",
    },
    {
      icon: <PhoneOutlined />,
      text: "+60183663236",
    },
    // {
    //   icon: <AimOutlined />,
    //   text: "54 Jalan Damai Perdana 9/2g, bdr damai perdana 56000 KL, Malaysia",
    // },
    {
      icon: <CrownOutlined />,
      text: "https//dayrlism.info",
    },
    {
      icon: <LinkedinOutlined />,
      text: "https://www.linkedin.com/in/dayrl10/",
    },
    {
      icon: <SkypeOutlined />,
      text: "dayrl10",
    },
  ],
  careers: [
    {
      types: types.one,
      title: "tech skills",
      content: [
        "nodejs",
        "reactjs",
        "reactnative",
        "es5-10",
        "typescript",
        "html5",
        "javascript",
        "jquery",
        "css3",
        "ajax",
        "vuejs",
        "gatsbyjs",
        "restapi",
        "sass",
        "less",
        "webpack",
        "socketio",
        "vanillajs",
        "bootstrap",
        "flowjs",
        "lodash",
      ],
    },
    {
      types: types.one,
      title: "skills",
      content: [
        "digital ocean",
        "google cloud",
        "aws",
        "headless cms",
        "mvc",
        "oop",
        "virtual dom",
        "agile",
        "scrum",
        "sdlc",
        "git flow",
        "version control",
        "waterfall",
        "git flow",
        "jenkins",
        "micro frontend",
        "cl/cd",
        "jwt token",
        "mysql",
        "mongodb",
        "sqlite",
        "micro service",
      ],
    },
    {
      title: titles.languages,
      content: [
        {
          head: "english",
          subhead: "full professional proficiency",
        },
        {
          head: "chinese",
          subhead: "professional working proficiency",
        },
        {
          head: "cantonese",
          subhead: "professional working proficiency",
        },
      ],
    },
    {
      types: types.two,
      title: titles.certificates,
      content: [
        {
          head: "microsoft certified web developer (05/2013 — 08/2014)",
          subhead: "asrnet, html5, css3 ",
        },
        {
          head: "certificate of completion sololearn (02/2016 — present)",
          subhead: "javascript, html5, c#, sql ",
        },
        {
          head: "certificate of completion udemy (05/2018— present)",
          subhead: "reactjs, redux",
        },
      ],
    },
    {
      title: titles.education,
      content: [
        {
          head: "diploma in software engineer",
          subhead: "asia pacific university",
          date: "03/2012 - 07/2014",
        },
      ],
    },
    {
      types: types.two,
      title: titles.organizations,
      content: [
        {
          head: "lottiefiles (3/2021-present)",
          subhead: "senior fullstack developer",
        },
        {
          head: "plus65 interactive pte ltd (01/2020-2/2021)",
          subhead: "senior frontend developer",
        },
        {
          head: "rea group ltd (1/2019-01/2020)",
          subhead: "fullstack developer",
        },
        {
          head: "carsome sdh bhd (03/2018-01/2019)",
          subhead: "senior frontend developer",
        },
        {
          head: "leet entertainment (10/2017-11/2018)",
          subhead: "software engineer",
        },
        {
          head: "nettium sdh bhd (09/2014 —06/2015)",
          subhead: "mobile web app developer",
        },
        {
          head: "inspired mobile sdh bhd (06/2015 — 10/2017)",
          subhead: "senior creative developer",
        },
      ],
    },
    {
      types: types.three,
      title: "work experience",
      content: [
        {
          title: "senior fullstack developer",
          company: "lottiefiles",
          period: "3/2021-present",
          country: "malaysia",
          achievements: [
            "integrate the Lottiefiles plugin into varieties of platforms like Gworkspace, Adobe Production Tools, Etc",
            "maintain all Lottiefiles plugins framework and keep enhancing",
            "schedule and publish plugin",
          ],
        },
        {
          title: "senior frontend developer",
          company: "plus65 interactive pte ltd",
          period: "01/2020-2/2021",
          country: "singapore",
          achievements: [
            "support existing different kind of project, affiliates, cooperate landing.",
            "handling multiple project with the team, pm and team lead",
            "understand new requirement and develop new projects",
          ],
        },
        {
          title: "fullstack developer",
          company: "rea group ltd",
          period: "1/2019-01/2020",
          country: "kl, malaysia",
          achievements: [
            "mainly focus on customer tooling program’s frontend development with one of the popular vendor team in china, targeted to regain and build up a solid frontend team back in malaysia hq operation office.",
            "help on some api creation whenever there is a need, also with another layer which mainly connect both api gateway and frontend to communicate each other call the graphql.",
          ],
        },
        {
          title: "senior frontend developer",
          company: "carsome sdh bhd",
          period: "03/2018-01/2019",
          country: "selangor, malaysia",
          achievements: [
            "handling any frontend scope project from carsome, including website, dashboard, api widget.",
            "develop and revamp current website and dashboard using latest technology virtual dom like reactjs and riotjs.",
            "liaise with backend team to plug all necessary api into the frontend development environment.",
            "enhanced and bug fix existing framework.",
            "work closely with product team to complete all the necessary features and release.",
          ],
        },
        {
          title: "software engineer",
          company: "leet entertainment sdh bhd",
          period: "10/2017-11/2018",
          country: "selangor, malaysia",
          achievements: [
            "involve in the requirement design of the module.",
            "working with the team to come up the best efficient solution to handle the module.",
            "focusing on the latest trend tech like react for the future developments.",
            "reviewing code as well involving in frontend & backend development.",
            "assist on the phases module toward the team in china to push forward the progression.",
            "read through api docs from the backend team and render the logic and interfaces with react js together with other dependencies.",
            "interview candidate for company expand.",
          ],
        },
        {
          title: "senior creative developer",
          company: "inspired mobile sdh bhd",
          period: "06/2015-10/2017",
          country: "selangor, malaysia",
          achievements: [
            "developing backend of the latest in house platform for a client chat support using socket.io.",
            "working closely with creative team in malaysia or uk and build ads unit that are up to the client standard for their campaign running.",
            "develop ads units such as banner, interstitials, expandable banner any format that require by the client using normal frontend code like html5, css3, jquery, javascript and so forth together with the library tracker for recording the impression and clicks from the user.",
            "deploying code and generating links for the client using the service s3 that provided by aws cloud.",
            "developing and brainstorming new format for the ads unit.",
            "helping out the backend development such as the inspired platform (a platform that provides automation services that creating ads and campaign).",
          ],
        },
        {
          title: "mobile web app developer",
          company: "nettium sdh bhd",
          period: "09/2014-06/2015",
          country: "kl, malaysia",
          achievements: [
            "developing client website with asp.net mvc, using the language c#.",
            "enhancement on client webpage, maintaining all site, bug fix all the complaint that complaint by the client.",
            "developing any project that assign by the company with the group of programmer.",
          ],
        },
      ],
    },
    {
      types: types.three,
      title: "volunteer experience",
      content: [
        {
          title: "president",
          company: "carsome sdh bhd",
          period: "05/2018 – 12/2018",
          country: "selangor, malaysia",
          achievements: [
            "help to organise company event together with others who are passionate to create a positive working environment",
          ],
        },
        {
          title: "student representative, head of sports bureau",
          company: "asia pacific university",
          period: "07/2012 – 12/2013",
          country: "kl, malaysia",
          achievements: [
            "leading a team and managing one of the annual large major sports event of the school.",
          ],
        },
      ],
    },
    {
      types: types.one,
      title: "interests",
      content: [
        "technologies",
        "sports",
        "building products",
        "blockchain",
        "a.i",
        "big data",
      ],
    },
    {
      types: types.four,
      title: "personal projects",
      content: [
        {
          head: "portfolio (01/2014 – present)",
          subhead: "https://dayrlism.info",
        },
        {
          head: "ashwatta nepal (08/2019 – present)",
          subhead: "https://nepal.im90s.org",
        },
        {
          head: "the auction guys (04/2019 – present)",
          subhead: "https://www.theauctionguys.com.my",
        },
        {
          head: "babysteps (12/2019 – present)",
          subhead: "https://pungandco.im90s.org",
        },
        {
          head: "babysteps medical (12/2019 – present)",
          subhead: "https://bbsm.im90s.org/",
        },
        {
          head: "pung & co law-firm (06/2019 – present)",
          subhead: "https://pungandco.im90s.org",
        },
        {
          head: "montesofa (06/2020 – present)",
          subhead: "https://pung-and-co.com",
        },
        {
          head: "asia gemological laboratory (05/2019 – present)",
          subhead: "https://www.asiagemlab.com",
        },
        {
          head: "quasandra (02/2019 – 04/2019)",
          subhead: "https://quasandra.im90s.org",
        },
        {
          head: "im90s (11/2018 – present)",
          subhead: "https://im90s.org",
        },
        {
          head: "im90s dashboard (12/2018 – present)",
          subhead: "https://dashboard.im90s.org",
        },
      ],
    },
    {
      types: types.four,
      title: titles.references,
      content: [
        {
          head: "rex choo",
          subhead: "“senior backend dev”",
          contact: "contact:	+60122377765",
        },
        {
          head: "james wong",
          subhead: "“senior frontend dev”",
          contact: "contact:	+60129719418",
        },
        {
          head: "alex john suarez",
          subhead: "“technical lead“",
          contact: "contact: +65905108916 | alexjohnsuarez@gmail.com",
        },
      ],
    },
  ],
};

//https://cms.im90s.org/website-cms/1
