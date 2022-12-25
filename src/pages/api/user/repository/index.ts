import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import UserServices, { TUser } from "../service";

export default class UserRepository {
    prisma: PrismaClient;
    static prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    static async createUser(data: TUser) {
        const user = await UserServices.createUser(data);
        return user;
    }
}
