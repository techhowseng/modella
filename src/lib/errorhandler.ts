// create a error handler
// Compare this snippet from src/lib/errorhandler.ts:
import { AxiosError } from "axios";

export const errorHandler = (error: AxiosError) => {
  if (error.response) {
    // Request made and server responded
    console.log("Error data:", error.response.data);
    // console.log("Error status:", error.response.status);
    // console.log("Error headers:", error.response.headers);
    return { data: error.response.data, error: true };
  } else if (error.request) {
    // The request was made but no response was received
    console.log("request error:", error.request);
    return error.request;
  } else if (error.message) {
    // Something happened in setting up the request that triggered an Error
    console.log("Error Message:", error.message);
    return { message: error.message, error: true };
  }
  console.log("Error Config:", error.config);
  return { config: error.config, error: true };
};
