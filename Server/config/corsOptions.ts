export interface CorsOptions {
  config: (
    origin: string,
    callback: (error: Error | null, allow: boolean) => void
  ) => void;
}
const allowOrgins = [""];
const corsOptions: CorsOptions = {
  config: (origin: string, callback) => {
    if (allowOrgins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allow By Cors"), false);
    }
  },
};
export { corsOptions };
