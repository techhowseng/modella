import { BaseError } from "../helper/errors";
import { getObjectVal, isEmptyObject } from "./util";


const defaultCode = 'something_went_wrong';
const defaultMessage = 'Something went wrong';

function parse(error) {
  const isCustom = error instanceof BaseError;
  const resObj = {
    status: 400,
    code: defaultCode,
    message: defaultMessage
  };

  if (isCustom) {
    resObj.code = getObjectVal(error, 'code', defaultCode);
    resObj.message = getObjectVal(error, 'message', defaultMessage);
    resObj.status = getObjectVal(error, 'status');
    return resObj;
  }

  if (error.name === 'StatusCodeError') {
    resObj.message = error.message;
    resObj.code = defaultCode;
    return resObj;
  }

  if (error.name === 'RequestError') {
    resObj.message = 'External Server Is Down';
    resObj.code = defaultCode;
    resObj.status = 500;
    return resObj;
  }

  if (error.cause && error.cause.code === 'ECONNREFUSED') {
    resObj.message = 'External Server Is Down';
    resObj.code = defaultCode;
    resObj.status = 500;
    return resObj;
  }

  return resObj;
}

/**
 * ResponseService.js
 */
export const ResponseService = {
  json(res, statusOrError, message, data, meta, code) {
    const error = statusOrError instanceof Error ? statusOrError : null;

    const responseObj = {};
    responseObj.message = message;

    let status = statusOrError;

    if (error == "custom_400") {
      responseObj.code = "bad_request";
      responseObj.message = "Bad Request";
      responseObj.status = "400";
    } else if (error) {
      const errorObj = parse(error);
      responseObj.code = errorObj.code;
      responseObj.message = errorObj.message;
      status = getObjectVal(errorObj, 'status', status);
    }

    if (!isEmptyObject(data)) {
      responseObj.data = data;
    }
    if (!isEmptyObject(meta)) {
      responseObj.meta = meta;
    }
    if (!isEmptyObject(code)) {
      responseObj.code = code;
    }

    res.status(status).json(responseObj);
  },

  sendError(error, res) {
    const response = {
      message: error.message
    };
    const status = error.status || 400;
    res.status(status).json(response);
  }
};
