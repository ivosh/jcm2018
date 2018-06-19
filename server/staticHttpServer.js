'use strict';

const fs = require('async-file');
const http = require('http');
const path = require('path');
const url = require('url');
const logger = require('./logger');

const STATIC_ASSETS_PATH = '../ui/build';
const INITIAL_FILE = 'index.html';

const pickContentType = extension => {
  const contentTypes = {
    '.css': 'text/css',
    '.eot': 'application/vnd.ms-fontobject',
    '.html': 'text/html',
    '.ico': 'image/x-icon',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.map': 'application/json',
    '.svg': 'image/svg+xml',
    '.ttf': 'application/font-ttf',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2'
  };

  return contentTypes[extension];
};

const responseAbend = (response, message) => {
  response.setHeader('Content-Type', 'text/plain');
  response.statusCode = 500;
  response.end(`Internal error: ${message}`);
};

const streamFile = async (filename, response) => {
  const file = path.resolve(__dirname, STATIC_ASSETS_PATH, filename);

  let fd;
  try {
    fd = await fs.open(file, 'r');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }

    logger.error(`Problem while opening ${file}: ${err.message}`);
    throw err;
  }

  let stats;
  try {
    stats = await fs.fstat(fd);
  } catch (err) {
    logger.error(`Problem while gettting stats for ${file}: ${err.message}`);
    throw err;
  }

  const ext = path.extname(file);
  const contentType = pickContentType(ext);
  if (contentType === undefined) {
    const message = `Unrecognized extension ${ext} for ${file}`;
    logger.error(message);
    throw new Error(message);
  }

  response.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stats.size,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  });

  const rs = fs.createReadStream(undefined, { fd });
  rs.on('error', err => {
    rs.end();
    const message = `Problem while reading ${file}: ${err.message}`;
    logger.error(message);
    responseAbend(response, message);
  });

  logger.verbose(`Streaming file ${file} of size ${stats.size} with content type ${contentType}.`);
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
      logger.error(message);
      throw new Error(message);
    }
  }
};

const server = http.createServer((request, response) => {
  logger.verbose(`HTTP request for ${request.url}.`);

  response.on('error', err => {
    const message = `Problem while writing HTTP response: ${err.message}`;
    logger.error(message);
    responseAbend(response, message);
  });

  if (request.url.startsWith('/api')) {
    response.setHeader('Content-Type', 'application/json');
    response.write('{ "message" : "Hello from the API server!" }', () => {
      response.end();
    });
  } else {
    let { pathname } = url.parse(request.url);
    if (pathname[0] === '/') {
      pathname = pathname.substring(1);
    }
    if (pathname === '') {
      pathname = INITIAL_FILE;
    }

    streamRequest(pathname, response)
      .then()
      .catch(err => responseAbend(response, err.message));
  }
});

module.exports = server;
