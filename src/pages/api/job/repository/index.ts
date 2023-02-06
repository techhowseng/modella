import { PrismaClient } from "@prisma/client";
import SessionServices from "../../session/service";
import { ResponseService } from "../../../../services/ResponseService";
import prisma from "lib/prisma";
import JobsServices, { TJob } from "../service";

export default class JobsRepository {
  prisma: PrismaClient;
  static prisma: PrismaClient;

  constructor() {
      this.prisma = prisma;
  }

  static async createJob(req, res) {
    try {
      const {
        jobRole,
        jobDescription,
        locations,
        salary,
        jobType,
        jobLength,
        isOpen
      } = req.body;
      let token;
      const { authorization } = req.headers;
      if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
      const session = await SessionServices.getClientSession(res, token)
      if (session) {
      const contract = await JobsServices.createJob(
        res,
        session.id,
        jobRole,
        jobDescription,
        locations,
        salary,
        jobType,
        jobLength,
        isOpen
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

  static async getJob(req, res) {
    try {
      const { pid } = req.query;
      if (pid[1]) return this.getAllClientJobs(req, res);
      const contract = await JobsServices.getJob(res, ~~pid[0]);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientJobs(req, res) {
    try {
			let { pid } = req.query;
      const contract = await JobsServices.getAllClientJobs(res, ~~pid[0]);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(req, res) {
    try {
      if (req.query) return this.searchJobs(req, res);
      const contract = await JobsServices.getJobs(res);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }  
  
  static async searchJobs(req, res) {
    try {
      const { query } = req
      const contract = await JobsServices.searchJobs(res, query);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(req, res) {
    try {
      const { pid } = req.query;
      const contract = await JobsServices.deleteJob(res, ~~pid);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
