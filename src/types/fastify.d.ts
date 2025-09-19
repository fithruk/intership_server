import { Config } from "../config/schema";

declare module "fastify" {
	interface FastifyInstance {
		config: Config;
		pluginLoaded: (pluginName: string) => void;
		rssPlugin: { parse: (url: string) => Promise<RSSplagin> };
		prismaPlugin: {
			saveNewItemsInDB: (data: NewsItem[]) => Promise<void>;
			getNewsItems: () => Promise<NewsItem[]>;
		};
	}
}
