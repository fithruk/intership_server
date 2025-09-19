import { PrismaClient } from "../generated/prisma";
import fp from "fastify-plugin";
import { NewsItem } from "../modules/feedParser/types/types";
import {
	getNewsItems,
	saveNewItemsInDB,
} from "../modules/feedParser/services/mongoDBService";

const pluginName = "prismaPlugin";

export default fp(
	async (fastify) => {
		const prisma = new PrismaClient();

		try {
			fastify.decorate(pluginName, {
				saveNewItemsInDB: async (data: NewsItem[]) => {
					await saveNewItemsInDB(data, prisma);
				},
				getNewsItems: async () => {
					return await getNewsItems(prisma);
				},
			});

			fastify.pluginLoaded(pluginName);
		} catch (error) {
			fastify.log.error(error);
			throw error;
		}
	},
	{
		name: pluginName,
	},
);
