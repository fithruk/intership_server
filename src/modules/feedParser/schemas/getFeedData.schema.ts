import { FastifySchema } from "fastify";

const schema: FastifySchema = {
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
} as const;

const feedURlShema: FastifySchema = {
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

export { schema, feedURlShema };
