import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TJob = PrismaClient["job"]["create"]["data"];

export default class JobServices {
  static prisma: PrismaClient = prisma;

  static async createJob(
    res,
    clientId: number,
    data: TJob
  ) {
    try {
      const job = await this.prisma.job.create({
        data: {
          ...data,
          client: {
            connect: { id: clientId },
          },
        },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJob(res, id: number) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(res ) {
    try {
      const job = await this.prisma.job.findMany();
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientJobs(res, clientId: number) {
    try {
      const job = await this.prisma.job.findMany({
        where: { clientId },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async searchJobs(res, query: string | string[]) {
    try {
      const job = await this.prisma.job.findMany({
        where: { 
          jobDescription: {
            search: `${query}`,
          }
         },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateJob(res: any, data: TJob) {
    try {
      const updatedJob = await this.prisma.job.update({
        where: { id: data.id },
        data
      });
      return updatedJob;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(res: any, id: number) {
    try {
      const job = await this.prisma.job.delete({
        where: { id },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}