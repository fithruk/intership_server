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
exports.feedURlShema = feedURlShema;
