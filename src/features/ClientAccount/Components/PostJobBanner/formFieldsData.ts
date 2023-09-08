export const jobOptions = [
  "All",
  "FashionEditorial",
  "FashionCatalog",
  "Commercial",
  "Mature",
  "Runway",
  "Swimsuit",
  "Lingerie",
  "Fitness",
  "Fit",
  "Parts",
  "Promotional",
  "Glamour",
  "Child",
  "Petite",
  "PlusSize",
  "Freelance",
  "Print",
  "Other",
];

const salaryOptions = ["$100", "$500", "$700", "$900", "$1,000", "$5,000"];

export const JOB_FIELDS = [
  {
    label: "Job Title",
    type: "text",
    name: "jobRole",
  },
  {
    label: "Job Description",
    type: "textarea",
    name: "jobDescription",
  },
  {
    label: "Job Type",
    type: "select",
    name: "jobType",
    options: jobOptions,
  },
  {
    label: "Salary",
    type: "number",
    name: "salary",
    options: salaryOptions,
  },
  {
    label: "StartDate",
    type: "date",
    name: "startDate",
  },
  {
    label: "StartTime",
    type: "time",
    name: "startTime",
  },
  {
    label: "Hours",
    type: "number",
    name: "hours",
  },
  {
    label: "Days",
    type: "number",
    name: "days",
  },
  {
    label: "Location",
    type: "address",
    name: "locations",
  },
];
