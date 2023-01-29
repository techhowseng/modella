import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export const checkExistingUser = async (email: string) => {
  const existingEmail = await prisma.user.findFirst({
    where: { email }
  });
  console.log("existing email----------", Boolean(existingEmail))
  return Boolean(existingEmail)
}

export const existsInDB = async (data, model, columnName) => {
  console.log("very sexy")
  console.log("data, model, columnName--------", data, model, columnName)
  const existingValue = await prisma[model].findFirst({
    where: {
      [columnName]: data
    }
  })
  return existingValue
}