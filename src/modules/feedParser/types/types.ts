export type FeedUrlBody = {
	url?: string;
	force?: boolean;
};

export type RSSplagin = {
	parse: (usl: string) => Promise<any>;
};

export interface NewsItem {
	title: string;
	link: string;
	content?: string;
	pubDate: string;
	creator?: string;
	categories?: string[];
	guid: string;
}
