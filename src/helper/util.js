import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import SessionService from "../pages/api/session/service";

export const checkExistingUser = async (email) => {
  const existingEmail = await prisma.user.findFirst({
    where: { email }
  });
  return Boolean(existingEmail)
}

export const existsInDB = async (data, model, columnName) => {
  const existingValue = await prisma[model].findFirst({
    where: {
      [columnName]: data
    }
  })
  return existingValue
}

export const getUser = async (request) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getSession(request, token);
  return session;
}

export const getClient = async (request) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getClientSession(request, token);
  return session;
}

export const getModel = async (request) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getModelSession(request, token);
  return session;
}

export const getObjectVal = (obj, key, defaultVal) => {
  return obj[key] ? obj[key] : defaultVal
}

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}'
}

export const randomStringGenerator = () => {
  return Math.random().toString(36).substring(2)
}