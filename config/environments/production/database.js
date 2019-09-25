const {ConnectionString} = require('connection-string');
let settings;

function getConnection(parsed) {
  const database = parsed.path && parsed.path[0];
  return {
      client: parsed.protocol,
      host: parsed.hostname || process.env.DATABASE_HOST || '127.0.0.1',
      port: parsed.port || process.env.DATABASE_PORT || 27017,
      database: database || process.env.DATABASE_NAME || 'strapi',
      username: parsed.user || rocess.env.DATABASE_USERNAME || '',
      password: parsed.password || process.env.DATABASE_PASSWORD || '',
      ssl: process.env.DATABASE_SSL || false
  };
}

if (process.env.DATABASE_URL) {
  const parsed = new ConnectionString(process.env.DATABASE_URL);
  settings = getConnection(parsed);
}

module.exports = {
  defaultConnection: 'default',
  connections: {
    connector: 'strapi-hook-bookshelf',
    settings,
    options: {},
  },
};