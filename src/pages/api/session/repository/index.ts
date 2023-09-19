import { PrismaClient, User } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SessionServices from "../service";
import AdminServices from "../../admin/service";
import {
  checkExistingUser,
  existsInDB,
  profilePercentageComplete,
} from "../../../../helper/util";
import { ResponseService } from "../../../../services/ResponseService";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { SESSION_NAME } from "lib/constants";

export default class SessionRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async loginUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const inputs = req.body;
      inputs.email = inputs.email.toLowerCase();
      const user = await existsInDB(inputs.email, "user", "email");

      if (!user) throw new Error("Email doesn't exist.");

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        const jwtToken = jwt.sign(
          { id: user.id, type: user.type, email: user.email },
          process.env.JWT_KEY,
          {
            expiresIn: "24hr",
          }
        );
        const session = user
          ? await SessionServices.createSession(res, user.id, jwtToken)
          : "";
        let percentageComplete = {};
        if (user.type == "Model") {
          const modelData = await AdminServices.getModelData(
            res,
            user.id,
            "model"
          );
          const profileCompletion = profilePercentageComplete(modelData);
          percentageComplete = {
            profileCompletion,
          };
        }
        return ResponseService.json(res, 200, "Success", {
          session,
          ...percentageComplete,
        });
      }
      throw new Error("Email or password do not match.");
    } catch (err) {
      throw err;
    }
  }

  static async getUserSession(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      let user: any;
      let token: string;
      const cookies = JSON.parse(
        (getCookie(SESSION_NAME, { req, res }) as string) || ("{}" as string)
      );
      if (cookies && cookies.sessionToken) {
        token = cookies.sessionToken;
      }
      user = await SessionServices.getModelOrClient(res, token);
      return ResponseService.json(res, 200, "Success", user);
    } catch (err) {
      throw err;
    }
  }

  static async deleteSession(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      let token: string;
      const { authorization } = req.headers;
      if (authorization.split(" ")[0] === "Bearer")
        token = authorization.split(" ")[1];
      await SessionServices.deleteSession(res, token);
      return ResponseService.json(res, 200, "This user has been logged out.");
    } catch (err) {
      throw err;
    }
  }
}
