import { createRequestListener } from "@react-router/node";
import * as build from "../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js";
import { LLMS_TXT } from "./llms-txt-content.js";

const ssrHandler = createRequestListener({
  build,
  mode: process.env.NODE_ENV || "production",
});

// Markdown for Agents: an explicit `Accept: text/markdown` gets the site's
// llms.txt overview instead of rendered HTML. `*/*` (regular browsers) is
// unaffected — this only fires when a client asks for markdown by name.
export default function handler(req, res) {
  const accept = req.headers.accept || "";
  if (req.method === "GET" && /\btext\/markdown\b/.test(accept)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.end(LLMS_TXT);
    return;
  }
  return ssrHandler(req, res);
}
