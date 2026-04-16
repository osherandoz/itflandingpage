import { createRequestListener } from "@react-router/node";
import * as build from "../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js";

const handler = createRequestListener({
  build,
  mode: process.env.NODE_ENV || "production",
});

export default handler;
