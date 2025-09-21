import fp from "fastify-plugin";
import cors from "@fastify/cors";
const pluginName = "cors";

export default fp(async (fastify) => {
  try {
    await fastify.register(cors, {
      origin: fastify.config.CLIENT_URL,
      credentials: true,
    });

    fastify.pluginLoaded(pluginName);
  } catch (error) {
    fastify.log.error(error);
    throw error;
  }
});
