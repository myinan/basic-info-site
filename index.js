import http from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const server = http.createServer(async (req, res) => {
  const { url } = req;

  try {
    switch (url) {
      case "/":
        await serveFile(res, "views/index.html");
        break;
      case "/about":
        await serveFile(res, "views/about.html");
        break;
      case "/contact-me":
        await serveFile(res, "views/contact-me.html");
        break;
      default:
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 Not Found</h1>");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>500 Internal Server Error</h1>");
  }
});

async function serveFile(res, filePath) {
  const fullPath = join(process.cwd(), filePath);
  const data = await readFile(fullPath, "utf-8");
  res.setHeader("Content-Type", "text/html");
  res.end(data);
}

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
