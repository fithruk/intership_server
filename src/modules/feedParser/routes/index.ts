import { FastifyInstance } from "fastify";
import { feedURlShema, schema } from "../schemas/getFeedData.schema";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FeedUrlBody } from "../types/types";
import { feedURL } from "../services/parserService";

export default async function getFeedDataRoutes(fastify: FastifyInstance) {
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	fastify.register(
		async (fastify) => await fastify.register(import("../plugins/rss.plagin")),
	);

	route.get("/feedArticle", {}, async (request, reply) => {});

	route.post<{ Body: FeedUrlBody }>(
		"/feedURL",
		{
			schema: feedURlShema,
		},
		async (request, reply) => {
			const { url, force } = request.body;

			const items = await feedURL(fastify, url ?? "", force ?? false);

			reply.send({ data: items });
		},
	);
}
