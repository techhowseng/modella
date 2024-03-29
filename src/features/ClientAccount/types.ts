import { Client, Media, Model } from "@prisma/client";

export type CLIENT_ACCOUNT_MENU_ITEMS_TYPE = {
  id: number;
  name: string;
  icon: any;
  link: string;
};

export type JobsState = {
  clientJobs?: Job[];
  jobs?: Job[];
  job?: Job;
  editJob?: Job;
  isApplying?: boolean;
};

export type Job = JobAttributesType & {
  id: number;
  clientId: number;
};

export type JobAttributesType = {
  id?: string | number;
  jobRole: string;
  jobDescription: string;
  locations: string | null;
  fee: string | null;
  jobType: string | null;
  jobLength: string | null;
  isOpen?: boolean;
  experience?: string;
  applicants?: Model[];
  client?: ClientType;
};

export type ClientType = {
  companyName: string;
  phone: string;
  user: {
    Media: string[];
  };
  userId: string;
};
