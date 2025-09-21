import { FromSchema } from "json-schema-to-ts";

export const EnvSchema = {
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
} as const;

export type Config = FromSchema<typeof EnvSchema>;
