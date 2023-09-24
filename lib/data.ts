import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import HotelDB from '@/public/hoteldb.png';
import LazzzyBoard from '@/public/LazzzyBoard.png'
import ReactWeather from '@/public/React-weather.png'

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
    title: "R-Weather",
    description:
      "The Weather Application is a user-friendly web-based tool that provides real-time weather information for locations world wide",
    tags: ["React", "MongoDB", "OpenWeatherAPI"],
    imageUrl: ReactWeather,
  },
  {
    title: "Umai",
    description:
      "Umai is a hotel management system with desirable user-experience with all the mandatory functionalities like Add, Edit and Delete.",
    tags: ["Java", "JavaFx", "PostgreSQL"],
    imageUrl: HotelDB,
  },
  {
    title: "Lazzy Space",
    description:
      "Provides Effortless Task Management with seamless file sharing, LazzySpace is here to revolutionize the way you work, collaborate and conquer tasks.",
    tags: ["React", "Express JS", "SQL", "Mantine", "MongoDB" ],
    imageUrl: LazzzyBoard,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "Express",
  "PostgreSQL",
  "Python",
  "Framer Motion",
] as const;