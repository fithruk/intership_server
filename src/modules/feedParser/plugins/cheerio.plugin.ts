import fp from "fastify-plugin";
import * as cheerio from "cheerio";

const pluginName = "cheerioPlugin";

export default fp(
  async (fastify) => {
    try {
      fastify.decorate(pluginName, {
        loadFromURL: async (url: string) => {
          return await cheerio.fromURL(url, {
            requestOptions: {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
              },
              method: "GET",
            },
          });
        },
        getArticleValues: async (doc: cheerio.CheerioAPI) => {
          const articleTitle = doc("h1").text();
          const articleImg = doc(".block_post")
            ._findBySelector(".post_photo_news_img", 0)
            .attr("src");
          const articleTextContent = doc(".block_post .post_text").text();

          return { articleTitle, articleImg, articleTextContent };
        },
      });
    } catch (error) {
      fastify.log.error(error);
      throw error;
    }
  },
  { name: pluginName }
);
