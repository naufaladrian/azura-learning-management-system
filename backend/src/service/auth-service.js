import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { validate } from "../validation/validation.js";
import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  // Check if NIDN is provided and if it already exists
  if (user.nidn) {
    const countNidn = await prismaClient.user.count({
      where: {
        nidn: user.nidn,
      },
    });

    if (countNidn >= 1) {
      throw new ResponseError(400, "NIDN already exists");
    }
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      role: true,
      full_name: true,
      position: true,
      nidn: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      full_name: true,
      position: true,
      nidn: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      position: user.position,
      nidn: user.nidn,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      position: user.position,
      nidn: user.nidn,
    },
  };
};

const get = async (userId) => {
  userId = validate(getUserValidation, userId);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
      full_name: true,
      position: true,
      nidn: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        full_name: true,
        position: true,
        nidn: true,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Token is not valid");
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ResponseError(401, "Token is not valid");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new ResponseError(401, "Token has expired");
    }
    throw error;
  }
};

export default {
  register,
  login,
  get,
  verifyToken,
};
