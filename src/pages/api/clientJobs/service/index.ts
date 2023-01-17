import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";

// @ts-ignore
export type TJobs = PrismaClient["clientJobs"]["create"]["data"];

export default class JobServices {
  prisma: PrismaClient;
  static prisma: PrismaClient;
  
  constructor() {
  this.prisma = prisma;
  }

  static async createJob(
    res,
    clientId: number,
    jobRole: string,
    jobDescription: string,
    salary: string,
    jobType: string,
    jobLength: string
  ) {
    try {
      const job = await this.prisma.clientJobs.create({
        data: {
          jobRole,
          jobDescription,
          salary,
          jobType,
          jobLength,
          client: {
            connect: { id: clientId },
          },
        },
      });
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getJob(res, id: number) {
    try {
      const job = await this.prisma.clientJobs.findUnique({
        where: { id },
      });
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getJobs(res ) {
    try {
      const job = await this.prisma.clientJobs.findMany();
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClientJobs(res, clientId: number) {
    try {
      const job = await this.prisma.clientJobs.findMany({
        where: { clientId: clientId },
      });
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async searchJobs(res, query: string | string[]) {
    try {
      const job = await this.prisma.clientJobs.findMany({
        where: { 
          jobDescription: {
            search: `${query}`,
          }
         },
      });
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateJob(res, data: TJobs) {
    try {
      const updatedJob = await this.prisma.clientJobs.update({
        where: { id: data.id },
        data
      });
      return updatedJob;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async deleteJob(res, id: number) {
    try {
      const job = await this.prisma.clientJobs.delete({
        where: { id },
      });
      return job;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}