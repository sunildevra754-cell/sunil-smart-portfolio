import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACT_LINKS } from "../portfolio-data";

export default defineTool({
  name: "get_contact_links",
  title: "Get contact links",
  description:
    "Returns Sunil Devra's public contact links: LinkedIn, GitHub, email, and hosted resume PDF URL.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT_LINKS, null, 2) }],
    structuredContent: CONTACT_LINKS,
  }),
});
