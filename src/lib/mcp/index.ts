import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get_profile";
import getSkills from "./tools/get_skills";
import getExperience from "./tools/get_experience";
import getCertifications from "./tools/get_certifications";
import getFeaturedProject from "./tools/get_featured_project";
import getContactLinks from "./tools/get_contact_links";

export default defineMcp({
  name: "sunil-devra-portfolio",
  title: "Sunil Devra Portfolio",
  version: "0.1.0",
  instructions:
    "Public read-only tools that expose Sunil Devra's portfolio content: profile, skills, experience, certifications, featured project, and contact links. Use these to answer questions about Sunil's background and work.",
  tools: [
    getProfile,
    getSkills,
    getExperience,
    getCertifications,
    getFeaturedProject,
    getContactLinks,
  ],
});
