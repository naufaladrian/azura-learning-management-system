import express from "express";
import {
  authMiddleware,
  adminOnly,
  dosenOrAdmin,
  allRoles,
} from "../middleware/auth-middleware.js";
import { get } from "../controller/auth-controller.js";
import messageController from "../controller/message-controller.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
  getUsersByRole,
  getUserStatistics,
} from "../controller/user-controller.js";

const apiRouter = new express.Router();

// Apply auth middleware to all routes
apiRouter.use(authMiddleware);

// Auth routes - accessible by all authenticated users
apiRouter.get("/api/auth/me", get);

// Message routes with role-based access
apiRouter.post("/api/messages", allRoles, messageController.createMessage);
apiRouter.get("/api/messages", allRoles, messageController.getAllMessages);

// User management routes
apiRouter.get("/api/users", adminOnly, getAllUsers);
apiRouter.get("/api/users/statistics", adminOnly, getUserStatistics);
apiRouter.get("/api/users/role/:role", adminOnly, getUsersByRole);
apiRouter.get("/api/users/:id", adminOnly, getUserById);
apiRouter.put("/api/users/:id", adminOnly, updateUser);
apiRouter.delete("/api/users/:id", adminOnly, deleteUser);

// User profile routes (accessible by authenticated user)
apiRouter.put("/api/auth/change-password", allRoles, changePassword);

// Admin only routes
apiRouter.get("/api/admin/users", adminOnly, (req, res) => {
  res.json({ message: "Admin only endpoint - Get all users" });
});

// Dosen and Admin routes
apiRouter.post("/api/courses", dosenOrAdmin, (req, res) => {
  res.json({ message: "Create course - Dosen or Admin only" });
});

apiRouter.get("/api/courses", allRoles, (req, res) => {
  res.json({ message: "Get courses - All authenticated users" });
});

export { apiRouter };
