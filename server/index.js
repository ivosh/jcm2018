"use strict";

const fs = require("async-file");
const http = require("http");
const path = require("path");
const url = require("url");
const WebSocketServer = require("websocket").server;

const PORT = Number(process.env.PORT || 4000);
const STATIC_ASSETS_PATH = "../ui/build";
const INITIAL_FILE = "index.html";
process.title = "jcm2018-server";

const streamFile = async (filename, response) => {
  const file = path.resolve(__dirname, STATIC_ASSETS_PATH, filename);

  let fd;
  try {
    fd = await fs.open(file, "r");
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }

    console.error(
      new Date().toISOString(),
      `Problem while opening ${file}: ${err.message}`
    );
    throw err;
  }

  let stats;
  try {
    stats = await fs.fstat(fd);
  } catch (err) {
    console.error(
      new Date().toISOString(),
      `Problem while gettting stats for ${file}: ${err.message}`
    );
    throw err;
  }

  const contentTypes = {
    ".css": "text/css",
    ".eot": "application/vnd.ms-fontobject",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".json": "application/json",
    ".map": "application/json",
    ".svg": "image/svg+xml",
    ".ttf": "application/font-ttf",
    ".woff": "application/font-woff",
    ".woff2": "application/font-woff2"
  };
  const ext = path.extname(file);
  const contentType = contentTypes[ext];
  if (contentType === undefined) {
    const message = `Unrecognized extension ${ext} for ${file}`;
    console.error(new Date().toISOString(), message);
    throw new Error(message);
  }

  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": stats.size
  });

  let rs = fs.createReadStream(undefined, { fd: fd });
  rs.on("error", err => {
    console.error(
      new Date().toISOString(),
      `Problem while reading ${file}: ${err.message}`
    );
    rs.end();
    response.statusCode = 500;
    response.end();
  });

  console.log(
    new Date().toISOString(),
    `Streaming file ${file} of size ${stats.size} with content type ${contentType}.`
  );
  rs.pipe(response);

  return true;
};

const streamRequest = async (pathname, response) => {
  let handled = await streamFile(pathname, response);
  if (!handled) {
    // Handle all the remaining requests so the React app can handle routing.
    handled = await streamFile(INITIAL_FILE, response);
    if (!handled) {
      const message = `Failed to serve ${INITIAL_FILE}.`;
      console.error(new Date().toISOString(), message);
      throw new Error(message);
    }
  }
};

let server = http.createServer((request, response) => {
  console.log(new Date().toISOString(), `Request for ${request.url}.`);

  response.on("error", err => {
    console.error(
      new Date().toISOString(),
      `Problem while writing HTTP response: ${err.message}`
    );
    response.end();
  });

  if (request.url.startsWith("/api")) {
    response.set("Content-Type", "application/json");
    response.send('{ "message" : "Hello from the API server!" }');
    response.end();
  } else {
    let pathname = url.parse(request.url).pathname;
    if (pathname[0] === "/") {
      pathname = pathname.substring(1);
    }
    if (pathname === "") {
      pathname = INITIAL_FILE;
    }

    streamRequest(pathname, response).then();
  }
});

server.listen(PORT, () => {
  console.log(new Date().toISOString(), `Server is listening on port ${PORT}.`);
});

let ws = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

const originAllowed = origin => {
  // TODO: Implement same origin policy
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  return true;
};

ws.on("request", request => {
  if (!originAllowed(request.origin)) {
    request.reject(401);
    console.log(
      new Date().toISOString(),
      `Connection for origin ${request.origin} rejected.`
    );
    return;
  }

  let connection = request.accept("jcm2018", request.origin);
  console.log(
    new Date().toISOString(),
    `Connection for origin ${request.origin} accepted.`
  );

  connection.on("message", message => {
    if (message.type != "utf8") {
      connection.drop(connection.CLOSE_REASON_INVALID_DATA);
      console.log(
        new Date().toISOString(),
        `Message with unknown type ${message.type}.`
      );
      return;
    }

    console.log(new Date().toISOString(), `Received: ${message.utf8Data}`);
    connection.sendUTF("Hello from WS server: [" + message.utf8Data + "]");
  });

  connection.on("close", (reasonCode, description) => {
    console.log(
      new Date().toISOString(),
      `Connection ${connection.remoteAddress} disconnected with ${reasonCode}: ${description}.`
    );
  });
});
