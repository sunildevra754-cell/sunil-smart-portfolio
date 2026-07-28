import { defineTool } from "@lovable.dev/mcp-js";
import { EXPERIENCE } from "../portfolio-data";

export default defineTool({
  name: "get_experience",
  title: "Get experience",
  description:
    "Returns Sunil Devra's work and project experience, each entry with role, organization, period, and key accomplishments.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EXPERIENCE, null, 2) }],
    structuredContent: { experience: EXPERIENCE },
  }),
});
