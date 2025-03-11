import { createClient } from "redis";

const redisClient = createClient({
  username: "default",
  password: "eIui4DLJgpnPPrZ2gSHOyWZqB8XBTwWn",
  socket: {
    host: "redis-18989.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 18989,
  },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.on("connect", () => console.log("✅ Connected to Redis Cloud"));

await redisClient.connect();

export default redisClient; // ✅ Corrected export
