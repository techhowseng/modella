import * as yup from "yup";

export const jobFormDataSchema = yup.object().shape({
  jobRole: yup.string(),
  jobDescription: yup.string(),
  jobType: yup.string(),
  salary: yup.string(),
  // jobLength: yup.string(),
  locations: yup.string(),
  startDate: yup.string(),
  startTime: yup.string(),
  hours: yup.string(),
  days: yup.string(),
});
