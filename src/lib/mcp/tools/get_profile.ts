import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE } from "../portfolio-data";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Returns Sunil Devra's public profile: name, title, tagline, location, education, and about summary.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROFILE, null, 2) }],
    structuredContent: PROFILE,
  }),
});
