import { PrismaClient } from "@prisma/client";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import { NextApiResponse } from "next";

// @ts-ignore
export type TJob = PrismaClient["job"]["create"]["data"];

export default class JobServices {
  static prisma: PrismaClient = prisma;

  static async createJob(res: NextApiResponse, clientId: number, data: TJob) {
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
    } catch (err) {
      throw err;
    }
  }

  static async getJob(res: NextApiResponse, id: string) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
        include: {
          applicants: true,
          client: {
            select: {
              companyName: true,
              phone: true,
              userId: true,
              user: {
                select: {
                  Media: true,
                },
              },
            },
          },
        },
      });
      if (!job) {
        return ResponseService.sendError(
          { message: "A job with this ID does not exist." },
          res
        );
      }
      return (({ ...client }) => ({ ...client }))(job);
    } catch (err) {
      throw err;
    }
  }

  static async getJobs(res: NextApiResponse, page: number, perPage: number) {
    try {
      const job = await this.prisma.job.findMany({
        take: perPage,
        skip: perPage * (page - 1),
        include: {
          applicants: true,
          client: {
            select: {
              companyName: true,
              userId: true,
              user: {
                select: {
                  Media: true,
                },
              },
            },
          },
        },
      });

      return job;
    } catch (err) {
      throw err;
    }
  }

  static async getClientJobs(
    res: NextApiResponse,
    clientId: number,
    page: number
  ) {
    try {
      const job = await this.prisma.job.findMany({
        take: 10,
        skip: 10 * (page - 1),
        where: { clientId },
        include: {
          applicants: true,
        },
      });
      return job;
    } catch (err) {
      throw err;
    }
  }

  static async getModelJobs(res: NextApiResponse, id: number, page: number) {
    try {
      const job = await this.prisma.model.findUnique({
        where: { id },
        include: {
          jobs: true,
        },
      });
      return (({ jobs }) => ({ jobs }))(job);
    } catch (err) {
      throw err;
    }
  }

  static async searchJobs(
    res: NextApiResponse,
    query: TJob,
    page: number,
    perPage: number
  ) {
    try {
      const job = await this.prisma.job.findMany({
        take: perPage,
        skip: perPage * (page - 1),
        where: query,
      });
      return job;
    } catch (err) {
      throw err;
    }
  }

  static async updateJob(res: NextApiResponse, data: TJob, pid: string) {
    try {
      const updatedJob = await this.prisma.job.update({
        where: { id: pid },
        data,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }

  static async deleteJob(res: NextApiResponse, id: string) {
    try {
      const job = await this.prisma.job.delete({
        where: { id },
      });
      return job;
    } catch (err) {
      throw err;
    }
  }

  static async applyForJob(res: NextApiResponse, id: string, modelId: number) {
    try {
      const job = await this.prisma.job.update({
        where: { id },
        data: {
          applicants: {
            connect: {
              id: modelId,
            },
          },
        },
      });
      return job;
    } catch (err) {
      throw err;
    }
  }
}
