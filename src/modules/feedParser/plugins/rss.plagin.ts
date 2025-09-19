import fp from "fastify-plugin";
import Parser from "rss-parser";

const pluginName = "rssPlugin";

export default fp(
	async (fastify) => {
		const parser = new Parser();

		fastify.decorate(pluginName, {
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
	},
);
