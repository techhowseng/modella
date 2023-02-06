import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserServices, { TUser } from "../service";
import SessionServices from "../../session/service";
import { getUser, randomStringGenerator } from "../../../../helper/util";
import { checkExistingUser, existsInDB } from "../helper";
import { ResponseService } from "../../../../helper/ResponseService";
import { EntityExistsError } from "helper/errors";

let JWT_KEY = process.env.JWT_KEY;

export default class UserRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async createUser(req, res) {
    console.log("number >>>> ", req.body);
    try {
      const inputs = req.body;
      inputs.email = inputs.email.toLowerCase();
      // this should be in service
      const existingEmail = await prisma.user.findFirst({
        where: { email: inputs.email },
      });
      if (Boolean(existingEmail)) {
        return ResponseService.json(
          res,
          new EntityExistsError("user", inputs.email)
        );
      }

      const newUser = await UserServices.createUser(
        res,
        inputs.email,
        bcrypt.hashSync(inputs.password, 8),
        inputs.type
      );

      let newVerification;
      if (newUser) {
        const verificationToken = randomStringGenerator();
        newVerification = await UserServices.createVerificationToken(
          newUser,
          verificationToken
        );
      }
      let responseObj = {
        ...newUser,
        ...newVerification,
      };
      return ResponseService.json(
        res,
        200,
        "Please verify your email address within 10 minutes",
        responseObj
      );
    } catch (err) {
      console.log("error >>> ", err);
      return ResponseService.sendError(err, res);
    }
  }

  static async updateUser(req, res) {
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

  static async getUser(req, res) {
    try {
      const { pid } = req.query;
      const user = await UserServices.getUser(res, pid);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await UserServices.getUserByEmail(res, email);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      let { pid } = req.query;
      const user = await getUser(req);
      if (user) {
        pid = user.type == "Admin" ? pid : user.id;
      }
      const deletedUser = await UserServices.deleteUser(pid);
      return deletedUser;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getSession(req, res) {
    try {
      const { token } = req.body;
      const user = await SessionServices.getSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateSession(req, res) {
    try {
      const { token } = req.body;
      const user = await SessionServices.updateSession(res, token);
      return user;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async createVerificationToken(req, res) {
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

  static async getVerificationToken(req, res) {
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
      let userDetails = {};
      const verifiedUser = await UserServices.verifyToken(res, token);
      if (verifiedUser) {
        await UserServices.verifyUser(res, verifiedUser.email);
        await UserServices.deleteVerificationToken(res, verifiedUser.email);
        const jwtToken = jwt.sign(verifiedUser, JWT_KEY, {
          expiresIn: "24hr",
        });
        const session = await SessionServices.createSession(
          res,
          verifiedUser.id,
          jwtToken
        );
        userDetails = {
          ...verifiedUser,
          ...session,
        };
        return userDetails;
      } else
        return ResponseService.sendError({ message: "Email verification Token has expired" }, res);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
