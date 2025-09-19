import fp from "fastify-plugin";
import Parser from "rss-parser";
import { RSSplagin } from "../types/types";

const pluginName = "rss-plugin";

export default fp(
  async (fastify) => {
    const parser = new Parser();

    fastify.decorate("rssPlagin", {
      parse: async (url: string) => {
        try {
          return await parser.parseURL(url);
        } catch (error) {
          fastify.log.error(error);
          throw error;
        }
      },
    });

    fastify.pluginLoaded(pluginName);
  },
  {
    name: pluginName,
  }
);
