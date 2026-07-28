import { defineTool } from "@lovable.dev/mcp-js";
import { SKILL_GROUPS } from "../portfolio-data";

export default defineTool({
  name: "get_skills",
  title: "Get skills",
  description:
    "Returns Sunil Devra's technical skills grouped by category (languages, frameworks & tools, AI/ML, rapid prototyping).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SKILL_GROUPS, null, 2) }],
    structuredContent: { groups: SKILL_GROUPS },
  }),
});
