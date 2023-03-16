const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
const init = async (port, host) => {
  const server = Hapi.server({
    port: port,
    host: host,
  });
 
  server.route(routes);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

module.exports = init;