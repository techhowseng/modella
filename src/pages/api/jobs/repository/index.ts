import { PrismaClient } from "@prisma/client";
import SessionServices from "../../session/service";
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
        jobRole,
        jobDescription,
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
      const { id } = req.body;
      const contract = await JobsServices.getJob(res, id);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getAllClientJobs(req, res) {
    try {
      const { id } = req.body;
      const contract = await JobsServices.getAllClientJobs(res, id);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async getJobs(res) {
    try {
      const contract = await JobsServices.getJobs(res);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }  
  
  static async searchJobs(req, res) {
    try {
      const { query } = req.body
      const contract = await JobsServices.searchJobs(res, query);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }

  static async deleteJob(req, res) {
    try {
      const { id } = req.body;
      const contract = await JobsServices.deleteJob(res, id);
      return contract;
    } catch(err) {
      return ResponseService.sendError(err, res);
    }
  }
}
