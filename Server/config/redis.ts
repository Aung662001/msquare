import { Redis } from "ioredis";

const redisConnect = () => {
  const URL = process.env.REDIS_URL;
  if (URL) {
    try {
      return new Redis(URL);
    } catch (err: any) {
      console.log(err.message);
    }
  } else {
    throw new Error("Redis error : not get redis Url");
  }
};
export { redisConnect };
