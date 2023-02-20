import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import SessionServices from "../../session/service";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import JobsServices, { TJob } from "../service";
import { handleQuery } from "helper/util";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createJob(req, res) {
    try {
      const data = req.body;
      let token;
      const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionServices.getClientSession(res, token)
      if (session) {
      const contract = await JobsServices.createJob(
        res,
        session.id,
        data
      );
      
      return contract;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateJob(req, res) {
    try {
      const { body } = req;
      const contract = await JobsServices.updateJob(res, body);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      if (pid[0] == "client"){
        return await this.getAllClientJobs(res, pid);
      } else if (pid[0] == "search") {
        return await this.searchJobs(req, res);
      } else {
        const contract = await JobsServices.getJob(res, ~~pid[0]);
        return contract;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientJobs(res: NextApiResponse<any>, pid) {
    try {
      const clientJobs = await JobsServices.getAllClientJobs(res, ~~pid[1]);
      return clientJobs;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(res: NextApiResponse<any>) {
    try {
      const contract = await JobsServices.getJobs(res);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }  
  
  static async searchJobs(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      let param = req.query;
      delete param.pid;
      const queries = handleQuery(param);
      const contract = await JobsServices.searchJobs(res, queries);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const contract = await JobsServices.deleteJob(res, ~~pid);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
