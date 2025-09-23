import jsonWebToken from "@fastify/jwt";
import fp from "fastify-plugin";

const pluginName = "jwtAuth";

export default fp(
  async (fastify) => {
    try {
      fastify.register(jsonWebToken, {
        secret: fastify.config.JSONKEY,
        cookie: {
          cookieName: "authorization",
          signed: false,
        },
      });

      fastify.decorate("authenticate", async function (request, reply) {
        try {
          console.log(request.cookies);

          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      });

      fastify.pluginLoaded(pluginName);
    } catch (error) {
      fastify.log.error(error);
      throw error;
    }
  },
  { name: pluginName }
);
