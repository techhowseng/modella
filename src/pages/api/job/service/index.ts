import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import { NextApiResponse } from "next";

// @ts-ignore
export type TJob = PrismaClient["job"]["create"]["data"];

export default class JobServices {
  static prisma: PrismaClient = prisma;

  static async createJob(
    res: NextApiResponse,
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

  static async getJob(res: NextApiResponse, id: number) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
        include: {
          applicants: true
        }
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(res: NextApiResponse ) {
    try {
      const job = await this.prisma.job.findMany({
        include: {
          applicants: true
        }
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientJobs(res: NextApiResponse, clientId: number) {
    try {
      const job = await this.prisma.job.findMany({
        where: { clientId },
        include: {
          applicants: true
        }
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async searchJobs(res: NextApiResponse, query: TJob) {
    try {
      const job = await this.prisma.job.findMany({
        where: query
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async updateJob(res: NextApiResponse, data: TJob, pid: number) {
    try {
      const updatedJob = await this.prisma.job.update({
        where: { id: pid },
        data
      });
      return updatedJob;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(res: NextApiResponse, id: number) {
    try {
      const job = await this.prisma.job.delete({
        where: { id },
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async applyForJob(res: NextApiResponse, id: number, modelId: number) {
    try {
      const job = await this.prisma.job.update({
        where: { id },
        data: {
          applicants: {
            connect: {
              id: modelId
            }
          }
        }
      });
      return job;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
