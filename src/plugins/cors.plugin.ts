import fp from "fastify-plugin";
import cors from "@fastify/cors";
const pluginName = "cors";

export default fp(async (fastify) => {
  try {
    await fastify.register(cors, {
      origin: [fastify.config.CLIENT_URL, "http://127.0.0.1:3000"],
      credentials: true,
    });

    fastify.pluginLoaded(pluginName);
  } catch (error) {
    fastify.log.error(error);
    throw error;
  }
});
