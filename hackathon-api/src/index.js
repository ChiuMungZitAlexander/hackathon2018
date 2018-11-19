/**
 * Module dependencies.
 */

import http from 'http';
import debug from 'debug';
import app from './app';
import db from './db';

const log = debug('hackathon-api:server');

/**
 * Get port from environment and store in Express.
 */

const port = Number(process.env.PORT || 3000);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log(`${bind} requires elevated privileges`);
      db.close();
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log(`${bind} is already in use`);
      db.close();
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  log(`Listening on ${bind}`);
});
