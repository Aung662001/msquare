import { Redis } from "ioredis";

const redisConnect = () => {
  const URL = process.env.REDIS_URL;
  if (URL) {
    try {
      return new Redis(URL);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    throw new Error("Redis error : not get Url");
  }
};
export { redisConnect };
