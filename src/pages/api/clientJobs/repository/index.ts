import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import JobsServices, { TJobs } from "../service";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createJob(data: TJobs) {
    const contract = await JobsServices.createJob(
      data.clientId,
      data.jobRole,
      data.jobDescription,
      data.salary,
      data.jobType,
      data.jobLength
    );
    return contract;
  }

  static async updateJob(id: number) {
    const contract = await JobsServices.updateJob(id);
		return contract;
  }

  static async getJob(id: number) {
    const contract = await JobsServices.getJob(id);
		return contract;
  }

  static async getAllClientJobs(id: number) {
    const contract = await JobsServices.getAllClientJobs(id);
		return contract;
  }

  static async getJobs() {
    const contract = await JobsServices.getJobs();
		return contract;
  }  
  
  static async searchJobs(query: string | string[]) {
    const contract = await JobsServices.searchJobs(query);
		return contract;
  }

  static async deleteJob(id: number) {
    const contract = await JobsServices.deleteJob(id);
		return contract;
  }
}
