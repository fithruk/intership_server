import { FastifyInstance } from "fastify";
import { feedArticleSchema, feedURlSchema } from "../schemas/schema";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FeedUrlBody } from "../types/types";
import { feedURL } from "../services/parserService";
import { parseArticle } from "../services/cheerioService";

export default async function getFeedDataRoutes(fastify: FastifyInstance) {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.register(
    async (fastify) => await fastify.register(import("../plugins/rss.plagin")),
    async (fastify) =>
      await fastify.register(import("../plugins/cheerio.plugin"))
  );

  route.get<{ Querystring: { url: string } }>(
    "/feedArticle",
    { schema: feedArticleSchema, onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const { url } = request.query;

      const articleJS = await parseArticle(url, fastify);

      reply.send(articleJS);
    }
  );

  route.post<{ Body: FeedUrlBody }>(
    "/feedURL",
    {
      schema: feedURlSchema,
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      const { url, force } = request.body;

      const items = await feedURL(fastify, url ?? "", force ?? false);

      reply.send({ items });
    }
  );
}
