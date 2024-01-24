import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://emmanueleboh.com/", // replace this with your deployed domain
  author: "Emmanuel O. Eboh",
  desc: "Breaking down complex concepts into simple, concise form.",
  title: "Emmanuel O. Eboh",
  ogImage: "new-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/EOEboh",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/emmanuel-eboh/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:ecolejnr007@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/eoeboh",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
];
