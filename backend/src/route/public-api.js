import express from "express";
import messageController from "../controller/message-controller.js";

const publicRouter = new express.Router();
publicRouter.get("/", (req, res) => {
  res.send("Hello");
});

publicRouter.post("/api/message", messageController.createMessage);
publicRouter.get("/api/message", messageController.getAllMessages);

export { publicRouter };
