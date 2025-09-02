import express from "express";
import cors from "cors";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(
  cors({
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
web.use(express.json());
web.use(publicRouter);
web.use(errorMiddleware);
