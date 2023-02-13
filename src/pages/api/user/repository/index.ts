import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import UserServices, { TUser } from "../service";
import SessionServices from "../../session/service";
import { getUser } from "../../../../helper/util";
import NotificationService from "../../../../services/NotificationService";
import { ResponseService } from "../../../../services/ResponseService";
import { EntityExistsError } from "helper/errors";
import { NextApiRequest, NextApiResponse } from "next";

let JWT_KEY = process.env.JWT_KEY;

export default class UserRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async createUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const inputs = req.body;
      inputs.email = inputs.email.toLowerCase();
      inputs.password = bcrypt.hashSync(inputs.password, 8);
      // this should be in service
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: inputs.email,
        },
      });
      if (Boolean(existingEmail)) {
        return ResponseService.json(
          res,
          new EntityExistsError("user", inputs.email)
        );
      }
      const verificationToken = uuid();
      const newVerification = await UserServices.createVerificationToken(
        inputs,
        verificationToken
      );
      await NotificationService.newSignup({
        email: inputs.email,
        code: verificationToken,
      });
      return ResponseService.json(
        res,
        200,
        "Please verify your email address within 10 minutes",
        (({ token, email }) => ({ token, email }))(newVerification)
      );
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateUser(req: NextApiRequest, res: NextApiResponse<any>) {
    interface Input {
      email?: string;
      password?: string;
      type?: string;
    }

    try {
      const { email, password, type } = req.body;
      let { pid } = req.query;

      const user = await getUser(req);
      if (user) {
        pid = user.type == "Admin" ? pid : user.id;
      }
      let input: Input = {};
      email ? (input.email = email.toLowerCase()) : null;
      password ? (input.password = bcrypt.hashSync(password, 8)) : null;
      type ? (input.type = type) : null;
      const updatedUser = await UserServices.updateUser(res, pid, input);
      return updatedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const user = await UserServices.getUser(res, pid as string);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserByEmail(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { email } = req.body;
      const user = await UserServices.getUserByEmail(res, email);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        pid = user.type == "Admin" ? pid : user.id;
      }
      const deletedUser = await UserServices.deleteUser(pid as string);
      return deletedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getSession(req: { body: { token: any } }, res: any) {
    try {
      const { token } = req.body;
      const user = await SessionServices.getSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateSession(req: { body: { token: any } }, res: any) {
    try {
      const { token } = req.body;
      const user = await SessionServices.updateSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async createVerificationToken(
    req: { body: { token: any; identifier: any } },
    res: any
  ) {
    try {
      const { token, identifier } = req.body;
      const user = await UserServices.createVerificationToken(
        identifier,
        token
      );
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getVerificationToken(req: { body: { token: any } }, res: any) {
    try {
      const { token } = req.body;
      const user = await UserServices.getVerificationToken(token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async verifyUser(req, res) {
    try {
      const { pid } = req.query;
      const token = pid || req.body.verifyToken;
      const verifiedUser = await UserServices.verifyToken(res, token);
      if (verifiedUser) {
        const { email, password, type } = verifiedUser as any;
        const user: any = await UserServices.createUser(
          res,
          email,
          password,
          type,
          true
        );
        await UserServices.deleteVerificationToken(res, email);
        const jwtToken = jwt.sign(user, JWT_KEY, {
          expiresIn: "24hr",
        });
        const session = user
          ? await SessionServices.createSession(res, user.id, jwtToken)
          : null;
        const userDetails = {
          ...user,
          ...session,
        };
        return userDetails;
      } else
        return ResponseService.sendError(
          { message: "Email verification Token has expired" },
          res
        );
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
