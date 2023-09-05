import { getFileExtension } from "lib/functions";
import * as yup from "yup";

const MAX_FILE_SIZE = 5120;
export const importGallerySchema = yup.object().shape({
  file: yup
    .mixed()
    .test({
      message: "Please provide a supported file type, .csv or .xlsx",
      test: (file: any, context) => {
        const isValid = ["png", "webp", "jpeg", "jpg", "gif"].includes(
          getFileExtension(file?.name as string) as string
        );
        if (!isValid) context?.createError();
        return isValid;
      },
    })
    .test({
      message: `File too big, can't exceed ${MAX_FILE_SIZE / 1024}MB`,
      test: (file: any) => {
        const isValid = file?.size / 1024 <= MAX_FILE_SIZE;
        return isValid;
      },
    }),
});
