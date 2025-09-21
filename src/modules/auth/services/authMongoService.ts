import { FastifyInstance } from "fastify";
import { RegistrationBodyTypes } from "../types/types";

const createNewUserInDB = async (
  newUserData: RegistrationBodyTypes,
  fastify: FastifyInstance
) => {
  const { name, email, password } = newUserData;

  const candidate = await findUserByEmail(email, fastify);

  if (candidate) throw new Error(`User with ${email} is already exist!`);

  const hashedPassword = await fastify.brypt.hash(password);

  const newUser = { name, email, password: hashedPassword };

  await registrateNewUser(newUser, fastify);
};

const findUserByEmail = async (email: string, fastify: FastifyInstance) => {
  return await fastify.prismaPlugin.users.findUserByEmail(email);
};

const registrateNewUser = async (
  newUserData: RegistrationBodyTypes,
  fastify: FastifyInstance
) => {
  await fastify.prismaPlugin.users.registrateNewUser(newUserData);
};

export { createNewUserInDB, findUserByEmail };
