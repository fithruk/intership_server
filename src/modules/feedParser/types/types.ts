export type FeedUrlBody = {
  url: string;
  force?: boolean;
};

export type RSSplagin = {
  parse: (usl: string) => Promise<any>;
};
