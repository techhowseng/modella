const jobOptions = [
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
    type: "text",
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
    type: "select",
    name: "salary",
    options: salaryOptions,
  },
  {
    label: "Duration",
    type: "datetime",
    name: "jobLength",
  },
  {
    label: "Location",
    type: "text",
    name: "location",
  },
];
