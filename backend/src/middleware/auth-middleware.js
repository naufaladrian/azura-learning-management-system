import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";
import authService from "../service/auth-service.js";

const authMiddleware = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    try {
      const user = await authService.verifyToken(token);
      req.user = user;
      next();
    } catch (e) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    }
  }
};

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        errors: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        errors: "Forbidden - Insufficient permissions",
      });
    }

    next();
  };
};

const adminOnly = roleMiddleware("ADMIN");
const dosenOrAdmin = roleMiddleware("DOSEN", "ADMIN");
const allRoles = roleMiddleware("SISWA", "DOSEN", "ADMIN");

const getTokenFromHeader = (request) => {
  const token = request.get("Authorization");
  if (!token) {
    return null;
  }

  if (!token.startsWith("Bearer ")) {
    return null;
  }

  return token.slice(7);
};

export { authMiddleware, roleMiddleware, adminOnly, dosenOrAdmin, allRoles };
