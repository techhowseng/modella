export const TEN_MINUTES_FROM_NOW = new Date(+new Date() + 60000*10);
export const TWENTY_FOUR_HOURS_FROM_NOW = new Date(+new Date() + 60000*1440);
export const ONE_HOUR_FROM_NOW = new Date(+new Date() + 60000*60);
export const authorisedPathMethods = {
  "user" : [ "PUT", "DELETE"],
  "model" : [ "POST", "PUT", "DELETE"],
  "session" : [ "DELETE"],
  "media" : [ "POST", "PUT", "DELETE"],
  "history" : [ "POST", "PUT", "DELETE"],
  "jobs" : [ "POST", "PUT", "DELETE"],
  "contracts" : [ "POST", "PUT", "DELETE"],
  "client" : [ "POST", "PUT", "DELETE"]
}