import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";
import { matchedData } from "express-validator";
import SessionService from "../pages/api/session/service";

export const checkExistingUser = async (email) => {
  const existingEmail = await prisma.user.findFirst({
    where: { email }
  });
  return Boolean(existingEmail)
}

export const existsInDB = async (data, model, columnName) => {
  const existingValue = await prisma[model].findFirst({
    where: {
      [columnName]: data
    }
  })
  return existingValue
}

export const getUser = async (request, response) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getSession(response, token);
  return session;
}

export const getClient = async (request) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getClientSession(request, token);
  return session;
}

export const getModel = async (request, response) => {
  let token;
  const { authorization } = request.headers;
  if (authorization.split(' ')[0] === 'Bearer') token = authorization.split(' ')[1]
  const session = await SessionService.getModelSession(response, token);
  return session;
}

export const getObjectVal = (obj, key, defaultVal) => {
  return obj[key] ? obj[key] : defaultVal
}

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}'
}

export const permittedParams = (req) => {
  req.body = matchedData(req, {
    includeOptionals: true,
    onlyValidData: true
   });
}

export const handleSymbolComparison = (key, range, isDate) => {
  if (range[0] == "<") {
    return {
      [key]: {
        lte: isDate ? new Date(range[1]) : parseFloat(range[1])
      }
    }
  } else {
    return {
      [key]: {
        gte: isDate ? new Date(range[1]) : parseFloat(range[1])
      }
    }
  }
}

export const handleRangeObject = (key, range, isDate) => {
  return {
    [key]: {
      gte: isDate ? new Date(range[0]) : parseFloat(range[0]),
      lte: isDate ? new Date(range[1]) : parseFloat(range[1])
    }
  }
}

export const handleQueryObject = (params) => {
  let search = {};
  let obj = {};
  for (const key in params) {
    let range = params[key].split(",");
    let isDate = params[key].includes("-");
    let num = parseFloat(params[key]);
    if (range[0] == "<" || range[0] == ">") {
      obj = handleSymbolComparison(key, range, isDate);
    } else if (range.length > 1) {
      obj = handleRangeObject(key, range, isDate);
    } else if (Boolean(num)) {
      obj = {
        [key]: num,
      };
    } else {
      obj = {
        [key]: {
          search: params[key]
        }
      };
    }
    Object.assign(search, obj);
  }
return search
}
