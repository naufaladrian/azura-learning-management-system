import express from "express";
import messageController from "../controller/message-controller.js";
import { register, login } from "../controller/auth-controller.js";

const publicRouter = new express.Router();
publicRouter.get("/", (req, res) => {
  res.send("Hello");
});

publicRouter.post("/api/message", messageController.createMessage);
publicRouter.get("/api/message", messageController.getAllMessages);

// Auth routes
publicRouter.post("/api/auth/register", register);
publicRouter.post("/api/auth/login", login);

export { publicRouter };
