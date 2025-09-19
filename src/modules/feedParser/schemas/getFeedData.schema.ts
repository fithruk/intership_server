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
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: { type: "string" },
      },
    },
  },
};

export { schema, feedURlShema };
