import { PrismaClient } from "../../../generated/prisma";
import { NewsItem } from "../types/types";

const saveNewItemsInDB = async (data: NewsItem[], prisma: PrismaClient) => {
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
};

const getNewsItems = async (prisma: PrismaClient) => {
	return await prisma.newsItem.findMany();
};

export { saveNewItemsInDB, getNewsItems };
