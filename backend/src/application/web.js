import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { publicRouter } from "../route/public-api.js";
import { apiRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

web.use(
  cors({
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

web.use(limiter);

web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
