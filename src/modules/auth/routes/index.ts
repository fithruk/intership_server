import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance } from "fastify";
import { RegistrationBodyTypes } from "../types/types";
import { loginShema, registerShema } from "../shemas/shema";
import {
	createNewUserInDB,
	findUserByEmail,
} from "../services/authMongoService";

export default async function getAuthRoutes(fastify: FastifyInstance) {
	const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	fastify.register(
		async (fastify) =>
			await fastify.register(import("../plugins/bryps.plugin")),
	);

	route.post<{ Body: RegistrationBodyTypes }>(
		"/registration",
		{
			schema: registerShema,
		},
		async (request, reply) => {
			const newUserData = request.body;
			await createNewUserInDB(newUserData, fastify);
			reply.send({
				message: `Registration for user ${newUserData.name} has been passed successfully!`,
			});
		},
	);

	route.post<{ Body: Omit<RegistrationBodyTypes, "name"> }>(
		"/login",
		{ schema: loginShema },
		async (request, reply) => {
			const { email, password } = request.body;

			const candidate = await findUserByEmail(email, fastify);

			if (!candidate)
				return reply.code(401).send({ message: "Incorrect email or password" });

			const isValidPassword = await fastify.brypt.compare(
				password,
				candidate.password,
			);
			if (!isValidPassword)
				return reply.code(401).send({ message: "Incorrect email or password" });

			const token = fastify.jwt.sign(
				{
					id: candidate.id,
					email: candidate.email,
				},
				{
					expiresIn: "15m",
				},
			);

			reply.setCookie("acessToken", token, {
				path: "/",
				httpOnly: true,
				secure: true,
				maxAge: 60 * 15,
			});

			reply.send({ message: "Login passed succesfully" });
		},
	);
}
