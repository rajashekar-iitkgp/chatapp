import { createClient } from "redis";
import { REDIS_URL } from "./config.js";

const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect();

export { redisClient };
