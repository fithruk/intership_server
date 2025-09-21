import { FastifyInstance } from "fastify";
import { NewsItem } from "../types/types";

const saveNewItemsInDB = async (data: NewsItem[], fastify: FastifyInstance) => {
	await fastify.prismaPlugin.feed.saveNewItemsInDB(data);
};

const getNewsItems = async (fastify: FastifyInstance) => {
	return await fastify.prismaPlugin.feed.getNewsItems();
};

export { saveNewItemsInDB, getNewsItems };
