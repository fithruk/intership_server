import Fastify, { FastifyServerOptions } from "fastify";
import { join } from "node:path";
import AutoLoad from "@fastify/autoload";
import configPlugin from "./config";

export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
	const fastify = Fastify({ logger: true });
	await fastify.register(configPlugin);

	try {
		fastify.decorate("pluginLoaded", (pluginName: string) => {
			fastify.log.info(`✅ Plugin loaded: ${pluginName}`);
		});

		fastify.log.info("Starting to load plugins");
		await fastify.register(AutoLoad, {
			dir: join(__dirname, "plugins"),
			options: options,
			ignorePattern: /^((?!plugin).)*$/,
		});

		await fastify.register(AutoLoad, {
			dir: join(__dirname, "modules"),
			maxDepth: 2,
		});

		fastify.log.info("✅ Plugins loaded successfully");

		fastify.ready(() => {
			console.log(fastify.printRoutes());
			console.log(fastify.printPlugins);
		});
	} catch (error) {
		fastify.log.error("Error in autoload:", error);
		throw error;
	}

	return fastify;
}

export default buildApp;
