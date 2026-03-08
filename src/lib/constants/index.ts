export { colors, colorClasses } from './colors';

export const SITE_CONFIG = {
  name: "Catenally",
  tagline: "Data Inspired · Tech Integrated · Real Time Thinkers",
  description:
    "Software & digital solutions company providing web design, development, mobile applications, and scalable technology platforms.",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",        // Who We Are
  services: "/services",  // What We Do
  works: "/portfolio",    // Our Works
  contact: "/contact",    // Where We Locate
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
} as const;
