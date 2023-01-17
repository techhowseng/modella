import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export const checkExistingUser = async (email: string) => {
  const existingEmail = await prisma.user.findFirst({
    where: { email }
  });
  console.log("existing email----------", Boolean(existingEmail))
  return Boolean(existingEmail)
}