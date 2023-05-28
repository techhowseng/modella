import { useState } from "react";
import axios from "axios";
import { getSessionToken } from "features/functions";
import { useAppDispatch } from "store/hooks";
import { updateMediaList } from "features/Auth/slice";

export const useUploadForm = (url: string) => {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (formData: FormData) => {
    let resData;
    await axios
      .post(`/api/${url}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getSessionToken()}`,
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress =
            50 + (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
      })
      .then((res) => {
        resData = res.data;
        dispatch(updateMediaList(resData.data[0]));
      });

    setIsSuccess(true);
    return resData;
  };

  return { uploadForm, isSuccess, progress };
};
