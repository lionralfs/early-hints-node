import http from 'http';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function listener(req, res) {
  // _writeRaw is used here, node.js writeHead doesn't work
  // @see https://github.com/nodejs/node/issues/27921
  res._writeRaw(`HTTP/1.1 103 Early Hints\r\nLink: </style.css>; rel="prefetch"; as=style\r\n\r\n`, 'ascii', () => {});

  await sleep(2000);
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
}

let server = http.createServer(listener);
server.listen(8080);
