// Environment configuration
export const ENV = {
  NODE_ENV: typeof process !== "undefined" ? process.env.NODE_ENV || "development" : "development",
  IS_PROD: typeof process !== "undefined" ? process.env.NODE_ENV === "production" : false,
  IS_DEV: typeof process !== "undefined" ? process.env.NODE_ENV === "development" : true,
};
