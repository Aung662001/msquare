import { Redis } from "ioredis";

const redisClient = () => {
  const URL = process.env.REDIS_URL;
  if (URL) {
    return URL;
  } else {
    throw new Error("Redis error : not get redis Url");
  }
};
export const redis = new Redis(redisClient() as string);
