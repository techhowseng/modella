export type CLIENT_ACCOUNT_MENU_ITEMS_TYPE = {
  name: string;
  icon: any;
  link: string;
};

export type JobsState = {
  clientJobs?: Job[];
  jobs?: Job[];
  job?: Job;
  isApplying?: boolean;
};

export type Job = JobAttributesType & {
  id: number;
  clientId: number;
};

export type JobAttributesType = {
  jobRole: string;
  jobDescription: string;
  location: string | null;
  salary: string | null;
  jobType: string | null;
  jobLength: string | null;
  isOpen?: boolean;
  experience?: string;
  applied?: boolean;
};
