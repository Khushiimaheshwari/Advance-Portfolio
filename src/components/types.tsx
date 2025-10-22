import type { ReactNode } from "react";

interface LinkType {
  href: string;
  label: string;
  icon?: ReactNode;
}

interface ProjectLinks {
  code?: string;
  demo?: string;
}

interface Project {
  title: string;
  desc: string;
  stack: string[];
  details?: string[];
  links?: ProjectLinks;
}

export type { LinkType, Project, ProjectLinks };