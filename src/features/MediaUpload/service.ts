import { axiosMediaInstance } from "lib/axiosInstance";
import { errorHandler } from "lib/errorhandler";

export const uploadImageService = async (data: FormData) => {
  try {
    const response = await axiosMediaInstance.post("/media", data);
    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
};
