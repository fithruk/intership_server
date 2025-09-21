import { PrismaClient } from "../generated/prisma";
import fp from "fastify-plugin";
import { NewsItem } from "../modules/feedParser/types/types";
import { RegistrationBodyTypes } from "../modules/auth/types/types";

const pluginName = "prismaPlugin";

export default fp(
	async (fastify) => {
		const prisma = new PrismaClient();

		try {
			fastify.decorate(pluginName, {
				feed: {
					saveNewItemsInDB: async (data: NewsItem[]) => {
						for (const item of data) {
							await prisma.newsItem.upsert({
								where: { guid: item.guid },
								update: {
									title: item.title,
									link: item.link,
									content: item.content || "",
									pubDate: new Date(item.pubDate).toISOString(),
									creator: item.creator || "",
									categories: item.categories || [],
								},
								create: {
									title: item.title,
									link: item.link,
									content: item.content || "",
									pubDate: new Date(item.pubDate).toISOString(),
									creator: item.creator || "",
									categories: item.categories || [],
									guid: item.guid,
								},
							});
						}
					},
					getNewsItems: async () => {
						return await prisma.newsItem.findMany();
					},
				},

				users: {
					registrateNewUser: async (newUserData: RegistrationBodyTypes) => {
						await prisma.user.create({ data: newUserData });
					},
					findUserByEmail: async (email: string) => {
						return await prisma.user.findUnique({ where: { email } });
					},
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
