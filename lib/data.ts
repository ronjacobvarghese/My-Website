import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import NotYoutube from "@/public/Not-Youtube.png";
import PopupGen from "@/public/PopupGen.png";
import ReactWeather from "@/public/React-weather.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Blogs",
    hash: "#blogs",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
] as const;

export const experiencesData = [
  {
    title: "Associate Engineering Trainee",
    location: "Hitachi Vantara, Bangalore",
    description:
      "I was in the application development team primarily working with react and typescript, then moved to a project with data management using Oracle FAW and OAC ",
    icon: React.createElement(CgWorkAlt),
    date: "2023 January - 2023 August",
  },
  {
    title: "Graduation",
    location: "Amrita School Of Computing, Kerala",
    description:
      "Completion Of my 4 years of education to obtain my bachelors degree in Computer Science Engineering. Still working with professors to write a paper majoring in deep learning architectures.",
    icon: React.createElement(LuGraduationCap),
    date: "2019-present",
  },
] as const;

export const projectsData = [
  {
    title: "Not-Youtube",
    description:
      "Youtube is a social-media platform that has over 1 Billion videos across 37 million active youtube channels. This project is both a redesign and my approach to their platform.",
    tags: ["NextJs", "Prisma", "tRPC", "NextAuth", "Typescript"],
    imageUrl: NotYoutube,
    link: "https://not-youtube-taupe.vercel.app/",
    document:
      "https://www.notion.so/Not-Youtube-e95931cfdb49444295ec41f869bdd7a9?pvs=4",
  },
  {
    title: "Survey-Generator",
    description:
      "This web application generates customizable surveys and generates JavaScript code which can be seamlessly integrated into your projects.",
    tags: ["ReactJS", "TailwindCSS", "TypeScript", "React-Context"],
    imageUrl: PopupGen,
    link: "https://imaginative-jelly-336464.netlify.app/",
    document: "",
  },
  {
    title: "R-Weather",
    description:
      "The Weather Application is a user-friendly web-based tool that provides real-time weather information for locations world wide",
    tags: ["React", "MongoDB", "OpenWeatherAPI"],
    imageUrl: ReactWeather,
    link: "",
    document: "",
  },
] as const;

export const blogData = [
  {
    title: "Your Server-state Management Solution: React Query",
    description:
      "Ever tried using fetch and useEffect to fetch queries?? Yeah its painfull. If that's the case React-Query is your next destination, let look into it!!",
  },
  {
    title: "Next-gen Approach to API Developement: tRPC",
    description:
      "Ever wanted type safety and auto-complete between client and server? tRPC does the impossible, lets learn it!!",
  },
  {
    title: "Prisma: the ORM we all needed!!",
    description:
      "Prisma is a modern, open-source database toolkit and Object-Relational Mapping (ORM) system that simplifies database access for developers. It provides a type-safe and efficient way to interact with databases using a straightforward and intuitive API, making it easier to work with databases and manage data in your web applications.",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Prisma",
  "tRPC",
  "React Query",
  "Node.js",
  "SQL",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "Express",
  "PostgreSQL",
  "Python",
  "Framer Motion",
] as const;
