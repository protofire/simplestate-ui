import React from "react";
import { ProjectCard } from "./ProjectCard";
import { mockProjects } from "../../../mock/projects";

const project = mockProjects[0];
const openModal = () => {};


export default <ProjectCard openModal={openModal} project={project} />;
