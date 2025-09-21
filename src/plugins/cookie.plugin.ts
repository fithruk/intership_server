import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";

const pluginName = "cookiePlagin";

export default fp(
  async (fastify) => {
    try {
      fastify.register(fastifyCookie, {
        secret: fastify.config.COOKIE_SECRET,
        parseOptions: {},
      });

      fastify.pluginLoaded(pluginName);
    } catch (error) {
      fastify.log.error(error);
      throw error;
    }
  },
  {
    name: pluginName,
  }
);
