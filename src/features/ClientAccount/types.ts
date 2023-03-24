export type CLIENT_ACCOUNT_MENU_ITEMS_TYPE = {
  name: string;
  icon: any;
  link: string;
};

export type ClientJobsState = {
  clientJobs: Jobs[];
};

export type Jobs = {
  id: string;
};
