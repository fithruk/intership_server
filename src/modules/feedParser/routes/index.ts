import { FastifyInstance } from "fastify";
import { feedURlShema, schema } from "../schemas/getFeedData.schema";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FeedUrlBody } from "../types/types";

export default async function getFeedDataRoutes(fastify: FastifyInstance) {
  const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastify.register(
    async (instance) => await instance.register(import("../plugins/rss.plagin"))
  );

  route.get(
    "/feed",
    {
      schema: schema,
    },
    async (request, reply) => {
      reply.send({ hello: "feed" });
    }
  );

  route.post<{ Body: FeedUrlBody }>(
    "/feedURL",
    {
      schema: feedURlShema,
    },
    async (request, reply) => {
      const { url, force } = request.body;
      console.log(url, force);
      return { data: "Jopa konya" };
    }
  );
}
