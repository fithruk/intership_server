import bcrypt from "bcryptjs";
import fp from "fastify-plugin";

const pluginName = "brypt";

export default fp(
  async (fastify) => {
    fastify.decorate(pluginName, {
      hash: (password: string) => bcrypt.hash(password, 10),
      compare: (password: string, hash: string) =>
        bcrypt.compare(password, hash),
    });

    fastify.pluginLoaded(pluginName);
  },
  { name: pluginName }
);
