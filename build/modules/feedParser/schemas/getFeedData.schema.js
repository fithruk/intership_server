"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedURlShema = exports.schema = void 0;
const schema = {
	//   tags: ["feed"],
	//   summary: "Get feed data",
	//   description: "Get feed data",
	response: {
		200: {
			type: "object",
			properties: {
				hello: {
					type: "string",
				},
			},
		},
	},
};
exports.schema = schema;
const feedURlShema = {
	body: {
		type: "object",
		properties: {
			url: { type: "string" },
			force: { type: "boolean" },
		},
		required: ["url"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				data: {
					type: "array",
					items: {
						type: "object",
						properties: {
							title: { type: "string" },
							link: { type: "string" },
							content: { type: "string" },
							pubDate: { type: "string" },
							creator: { type: "string" },
							categories: {
								type: "array",
								items: { type: "string" },
							},
							guid: { type: "string" },
						},
						required: [
							"title",
							"link",
							"content",
							"pubDate",
							"creator",
							"guid",
						],
					},
				},
			},
		},
	},
};
exports.feedURlShema = feedURlShema;
