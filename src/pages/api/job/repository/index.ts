import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import JobsServices, { TJob } from "../service";
import { getModelOrClient, handleQuery } from "helper/util";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  static async createJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const client = await getModelOrClient(req, res);
      if (client) {
        const jobs = await JobsServices.createJob(res, client.id, req.body);
        return jobs;
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { body } = req;
      const { pid } = req.query;
      const jobs = await JobsServices.updateJob(res, body, pid as string);
      return jobs;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      if (pid[0] == "client" || pid[0] == "model"){
        return await this.getUserJobs(req, res, pid as string[]);
      } else if (pid[0] == "search") {
        return await this.searchJobs(req, res);
      } else {
        const job = await JobsServices.getJob(res, pid[0]);
        return job;
      }
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getUserJobs(
    req: NextApiRequest,
    res: NextApiResponse<any>,
    pid: string[]
  ) {
    try {
      const page = pid[2]?.replace(/[^0-9]/g, '') ?? 1;
      if (pid[0] == "client") return await JobsServices.getClientJobs(res, ~~pid[1], ~~page);
      return await JobsServices.getModelJobs(res, ~~pid[1], ~~page);
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const page = req.query.page ?? 1;
      const jobs = await JobsServices.getJobs(res, ~~page);
      return jobs;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async searchJobs(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid, page, ...allQueries } = req.query;
      const pageNo = page ?? 1;
      const queries = handleQuery(allQueries);
      const jobs = await JobsServices.searchJobs(res, queries, ~~pageNo);
      return jobs;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const job = await JobsServices.deleteJob(res, pid as string);
      return job;
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async applyForJob(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
      const { pid } = req.query;
      const model = await getModelOrClient(req, res);
      if (model) {
        const jobs = await JobsServices.applyForJob(res, pid[0] as string, model.id);
        return jobs;
      }
      return ResponseService.sendError(
        { message: "Token does not exist on database." },
        res
      );
    } catch (err) {
      return ResponseService.sendError(err, res);
    }
  }
}
