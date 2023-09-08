// create a error handler
// Compare this snippet from src/lib/errorhandler.ts:
import { AxiosError } from "axios";

export const errorHandler = (error: AxiosError) => {
  const defaultError = {
    error: true,
    message:
      "An error occurred while processing your request. Please try again.",
  };

  if (error.response) {
    const { message }: any = error.response.data;
    const data: any = error.response.data;
    // Request made and server responded
    console.log("Error data:", data);
    // console.log("Error status:", error.response.status);
    // console.log("Error headers:", error.response.headers);
    if (data.isError && data.name === "PrismaClientValidationError") {
      return defaultError;
    }
    if (data.isError && data.name === "ValidationError") {
      const errors = data.data.errors;
      const errorMessage =
        errors[0].property === "password"
          ? errors[0].constraints.isStrongPassword
          : data.message;
      return {
        data: errors[0].constraints,
        error: true,
        message: errorMessage || message,
      };
    }
    return { data: error.response.data, error: true, ...defaultError };
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
