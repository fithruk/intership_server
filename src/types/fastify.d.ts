import { Config } from "../config/schema";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    pluginLoaded: (pluginName: string) => void;
    rssPlugin: { parse: (url: string) => Promise<RSSplagin> };
    prismaPlugin: {
      feed: {
        saveNewItemsInDB: (data: NewsItem[]) => Promise<void>;
        getNewsItems: () => Promise<NewsItem[]>;
      };
      users: {
        registrateNewUser: (
          newUserData: RegistrationBodyTypes
        ) => Promise<void>;
        findUserByEmail: (email: string) => Promise<UserTypes>;
      };
    };
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    brypt: {
      hash: (password: string) => Promise<string>;
      compare: (password: string, hash: string) => Promise<boolean>;
    };
  }
}
