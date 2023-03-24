import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import SessionServices from "../../session/service";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import JobsServices, { TJob } from "../service";
import { getModel, getClient, handleQuery } from "helper/util";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createJob(req, res) {
    try {
      const client = await getClient(req);
      if (client) {
      const jobs = await JobsServices.createJob(
        res,
        client.id,
        req.body
      );
      return jobs;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateJob(req, res) {
    try {
      const { body } = req;
      const jobs = await JobsServices.updateJob(res, body);
      return jobs;
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
      const jobs = await JobsServices.getJobs(res);
      return jobs;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }  
  
  static async searchJobs(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      let param = req.query;
      delete param.pid;
      const queries = handleQuery(param);
      const jobs = await JobsServices.searchJobs(res, queries);
      return jobs;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const job = await JobsServices.deleteJob(res, ~~pid);
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async applyForJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const model = await getModel(req);
      if (model) {
      const jobs = await JobsServices.applyForJob(res, ~~pid, model.id);
      return jobs;
      }
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  } 
}
