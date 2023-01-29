import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

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

export const getObjectVal = (obj, key, defaultVal) => {
  return obj[key] ? obj[key] : defaultVal
}

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}'
}

export const randomStringGenerator = () => {
  return Math.random().toString(36).substring(2)
}