"use client";

import React from "react";

import { projectsData } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Project from "./Project";
import useSectionInView from "@/hooks/use-section-in-view";

export default function Projects() {
  const { ref } = useSectionInView("Projects");

  return (
    <section ref={ref} className="scroll-mt-28 mb-28" id="projects">
      <SectionHeader> My Projects</SectionHeader>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
