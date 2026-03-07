import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export const checkRateLimit = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { success } = await rateLimit.limit(ip);
    if (!success) {
      console.log("Rate limit exceeded for IP:", ip);
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.error("Error checking rate limit:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
