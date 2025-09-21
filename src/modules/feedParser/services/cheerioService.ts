import { FastifyInstance } from "fastify";

const parseArticle = async (url: string, fastify: FastifyInstance) => {
	const { loadFromURL, getArticleValues } = fastify.cheerioPlugin;
	const doc = await loadFromURL(url);
	return await getArticleValues(doc);
};
export { parseArticle };
