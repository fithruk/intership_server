"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvSchema = void 0;
exports.EnvSchema = {
	type: "object",
	properties: {
		PORT: { type: "number" },
		HOST: { type: "string" },
		JSONKEY: { type: "string" },
		CLIENT_URL: { type: "string" },
		COOKIE_SECRET: { type: "string" },
	},
	required: ["PORT", "HOST", "JSONKEY", "CLIENT_URL", "COOKIE_SECRET"],
	additionalProperties: false,
};
