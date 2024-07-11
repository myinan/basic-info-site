import express from "express";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const app = express();

async function serveFile(res, filePath) {
  try {
    const data = await readFile(join(process.cwd(), filePath), "utf-8");
    res.setHeader("Content-Type", "text/html");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("<h1>500 Internal Server Error</h1>");
  }
}

app.get("/", (req, res) => {
  serveFile(res, "views/index.html");
});

app.get("/about", (req, res) => {
  serveFile(res, "views/about.html");
});

app.get("/contact-me", (req, res) => {
  serveFile(res, "views/contact-me.html");
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
