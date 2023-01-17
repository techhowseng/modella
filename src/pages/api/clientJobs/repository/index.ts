import { PrismaClient } from "@prisma/client";
import { ResponseService } from "helper/ResponseService";
import prisma from "lib/prisma";
import JobsServices, { TJobs } from "../service";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createJob(req, res) {
    try {
      const {
        clientId,
        jobRole,
        jobDescription,
        salary,
        jobType,
        jobLength
      } = req.body;
      const contract = await JobsServices.createJob(
        res,
        clientId,
        jobRole,
        jobDescription,
        salary,
        jobType,
        jobLength
      );
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async updateJob(req, res) {
    try {
      const { body } = req;
      const contract = await JobsServices.updateJob(res, body);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getJob(req, res) {
    try {
      const { id } = req.body;
      const contract = await JobsServices.getJob(res, id);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getAllClientJobs(req, res) {
    try {
      const { id } = req.body;
      const contract = await JobsServices.getAllClientJobs(res, id);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async getJobs(res) {
    try {
      const contract = await JobsServices.getJobs(res);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }  
  
  static async searchJobs(req, res) {
    try {
      const { query } = req.body
      const contract = await JobsServices.searchJobs(res, query);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }

  static async deleteJob(req, res) {
    try {
      const { id } = req.body;
      const contract = await JobsServices.deleteJob(res, id);
      return contract;
    } catch(err) {
      return ResponseService.json(res, err);
    }
  }
}
