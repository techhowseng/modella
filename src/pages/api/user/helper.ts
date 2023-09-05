import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export const checkExistingUser = async (email: string) => {
  const existingEmail = await prisma.user.findFirst({
    where: { email }
  });
  return Boolean(existingEmail)
}

export const existsInDB = async (data, model, columnName) => {
  // @ts-ignore
  const existingValue = await prisma[model].findFirst({
    where: {
      [columnName]: data
    }
  })
  return existingValue
}