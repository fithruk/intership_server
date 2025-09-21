import { FastifyInstance } from "fastify";
import { NewsItem } from "../types/types";

const defaultUrl = "https://www.pravda.com.ua/eng/rss/view_mainnews/";

enum SwitchEnum {
  forceLoad = "forceLoad",
  defaultLoad = "defaultLoad",
  loadFromDB = "loadFromDB",
}
const saveNewsPreviewInDB = async (
  fastify: FastifyInstance,
  items: NewsItem[]
) => {
  await fastify.prismaPlugin.feed.saveNewItemsInDB(items);
};

const parseUrl = async (fastify: FastifyInstance, url: string) => {
  const { items }: { items: NewsItem[] } = await fastify.rssPlugin.parse(url);
  return items;
};

const feedURL = async (
  fastify: FastifyInstance,
  url: string,
  force: boolean
): Promise<NewsItem[]> => {
  let news: NewsItem[] = [];
  let option: SwitchEnum;

  if (!url) option = SwitchEnum.defaultLoad;
  else if (url && force) option = SwitchEnum.forceLoad;
  else option = SwitchEnum.loadFromDB;
  console.log(option + " option");

  switch (option) {
    case SwitchEnum.defaultLoad: {
      const dbNewsItems = await getNewsFromDB(fastify);
      news = dbNewsItems.length
        ? dbNewsItems
        : await parseUrl(fastify, defaultUrl);
      break;
    }
    case SwitchEnum.forceLoad: {
      news = await parseUrl(fastify, url);
      await fastify.prismaPlugin.feed.saveNewItemsInDB(news);
      break;
    }
    case SwitchEnum.loadFromDB: {
      news = await getNewsFromDB(fastify);
      break;
    }
  }

  return news;
};

const getNewsFromDB = async (fastify: FastifyInstance) => {
  return await fastify.prismaPlugin.feed.getNewsItems();
};

export { saveNewsPreviewInDB, feedURL };
