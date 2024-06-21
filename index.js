import http from "node:http";

const server = http.createServer();

server.listen(8080);

server.on("request", (req, res) => {
  const { headers, method, url } = req;

  req.on("error", (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end("Bad Request");
  });

  res.on("error", (err) => {
    console.error(err);
  });

  res.setHeader("Content-Type", "text/plain");

  switch (url) {
    case "/":
      res.end("Welcome to the index page.");
      break;
    case "/about":
      res.end("About us...");
      break;
    case "/contact-me":
      res.end("Contact me...");
      break;
    default:
      res.statusCode = 404;
      res.end("404 Not Found");
  }
});

console.log("Server running at http://localhost:8080/");
