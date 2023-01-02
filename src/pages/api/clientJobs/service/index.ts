import { PrismaClient } from "@prisma/client";
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
    clientId: number,
    jobRole: string,
    jobDescription: string,
    salary: string,
    jobType: string,
    jobLength: string
  ) {
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
  }

  static async getJob(id: number) {
    const job = await this.prisma.clientJobs.findUnique({
      where: { id },
    });
    return job;
  }

  static async getJobs() {
    const job = await this.prisma.clientJobs.findMany();
    return job;
  }

  static async getAllClientJobs(clientId: number) {
    const job = await this.prisma.clientJobs.findMany({
      where: { clientId: clientId },
    });
    return job;
  }

  static async searchJobs(query: string | string[]) {
    const job = await this.prisma.clientJobs.findMany({
      where: { 
        jobDescription: {
          search: `${query}`,
        }
       },
    });
    return job;
  }

  static async updateJob(data: TJobs) {
    const updatedJob = await this.prisma.clientJobs.update({
      where: { id: data.id },
      data
    });
    return updatedJob;
  }

  static async deleteJob(id: number) {
    const job = await this.prisma.clientJobs.delete({
      where: { id },
    });
    return job;
  }

}