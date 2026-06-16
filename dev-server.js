const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const root = __dirname;
const port = Number(process.env.PORT || 4174);
const clients = new Set();
const watchedExtensions = new Set([".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg"]);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const liveReloadSnippet = `
<script>
  (() => {
    const source = new EventSource("/__live-reload");
    source.onmessage = (event) => {
      if (event.data === "reload") window.location.reload();
    };
  })();
</script>`;

function safePath(requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const resolved = path.resolve(root, decoded.replace(/^\/+/, ""));
  return resolved.startsWith(root) ? resolved : null;
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const extension = path.extname(filePath);
    res.setHeader("Content-Type", mime[extension] || "application/octet-stream");

    if (extension === ".html") {
      const html = data.toString("utf8").replace("</body>", `${liveReloadSnippet}\n</body>`);
      res.end(html);
      return;
    }

    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);

  if (parsed.pathname === "/__live-reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const requestPath = parsed.pathname === "/" ? "/index.html" : parsed.pathname;
  const filePath = safePath(requestPath);

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  serveFile(filePath, res);
});

let reloadTimer;
function broadcastReload() {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    for (const client of clients) client.write("data: reload\n\n");
  }, 80);
}

function watchDirectory(directory) {
  fs.watch(directory, { recursive: false }, (event, filename) => {
    if (!filename) return;
    const changed = path.join(directory, filename.toString());
    const extension = path.extname(changed);
    if (watchedExtensions.has(extension)) broadcastReload();
  });
}

watchDirectory(root);
watchDirectory(path.join(root, "assets"));

server.listen(port, "0.0.0.0", () => {
  console.log(`el Lotus dev server running at http://127.0.0.1:${port}/`);
});
