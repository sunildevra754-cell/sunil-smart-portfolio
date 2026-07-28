import { defineTool } from "@lovable.dev/mcp-js";
import { FEATURED_PROJECT } from "../portfolio-data";

export default defineTool({
  name: "get_featured_project",
  title: "Get featured project",
  description:
    "Returns details of the flagship project 'Smart Farmer One Touch': description, live URL, tech stack, and feature list.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(FEATURED_PROJECT, null, 2) }],
    structuredContent: FEATURED_PROJECT,
  }),
});
