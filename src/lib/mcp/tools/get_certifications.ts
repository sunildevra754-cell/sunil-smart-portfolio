import { defineTool } from "@lovable.dev/mcp-js";
import { CERTIFICATIONS } from "../portfolio-data";

export default defineTool({
  name: "get_certifications",
  title: "Get certifications",
  description:
    "Returns Sunil Devra's certifications with issuer, date, certificate image URL, and verification link when available.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CERTIFICATIONS, null, 2) }],
    structuredContent: { certifications: CERTIFICATIONS },
  }),
});
