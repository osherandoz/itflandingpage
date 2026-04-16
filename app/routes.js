import { route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.jsx"),
  route("privacy", "./routes/privacy.jsx"),
  route("articles/:slug", "./routes/articles.$slug.jsx"),
];
