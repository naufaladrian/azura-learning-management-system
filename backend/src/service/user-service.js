import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  updateUserValidation,
  changePasswordValidation,
} from "../validation/user-validation.js";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import bcrypt from "bcrypt";

const getAllUsers = async (page = 1, limit = 10, role = null) => {
  const skip = (page - 1) * limit;

  const whereClause = role ? { role } : {};

  const [users, total] = await Promise.all([
    prismaClient.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        role: true,
        full_name: true,
        position: true,
        nidn: true,
      },
      skip,
      take: limit,
      orderBy: {
        email: "asc",
      },
    }),
    prismaClient.user.count({
      where: whereClause,
    }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (userId) => {
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

const updateUser = async (userId, request) => {
  const user = validate(updateUserValidation, request);
  userId = validate(getUserValidation, userId);

  const existingUser = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ResponseError(404, "User is not found");
  }

  // Check if email is being changed and if it already exists
  if (user.email && user.email !== existingUser.email) {
    const emailExists = await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new ResponseError(400, "Email already exists");
    }
  }

  // Check if NIDN is being changed and if it already exists
  if (user.nidn && user.nidn !== existingUser.nidn) {
    const nidnExists = await prismaClient.user.findFirst({
      where: {
        nidn: user.nidn,
        id: { not: userId },
      },
    });

    if (nidnExists) {
      throw new ResponseError(400, "NIDN already exists");
    }
  }

  return prismaClient.user.update({
    where: {
      id: userId,
    },
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

const changePassword = async (userId, request) => {
  const passwordData = validate(changePasswordValidation, request);
  userId = validate(getUserValidation, userId);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    passwordData.currentPassword,
    user.password,
  );
  if (!isCurrentPasswordValid) {
    throw new ResponseError(400, "Current password is incorrect");
  }

  // Hash new password
  const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, 10);

  await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return { message: "Password changed successfully" };
};

const deleteUser = async (userId) => {
  userId = validate(getUserValidation, userId);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  await prismaClient.user.delete({
    where: {
      id: userId,
    },
  });

  return { message: "User deleted successfully" };
};

const getUsersByRole = async (role) => {
  if (!["SISWA", "DOSEN", "ADMIN"].includes(role)) {
    throw new ResponseError(400, "Invalid role");
  }

  const users = await prismaClient.user.findMany({
    where: {
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      full_name: true,
      position: true,
      nidn: true,
    },
    orderBy: {
      email: "asc",
    },
  });

  return users;
};

const getUserStatistics = async () => {
  const [siswaCount, dosenCount, adminCount, totalCount] = await Promise.all([
    prismaClient.user.count({ where: { role: "SISWA" } }),
    prismaClient.user.count({ where: { role: "DOSEN" } }),
    prismaClient.user.count({ where: { role: "ADMIN" } }),
    prismaClient.user.count(),
  ]);

  return {
    total: totalCount,
    siswa: siswaCount,
    dosen: dosenCount,
    admin: adminCount,
  };
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
  getUsersByRole,
  getUserStatistics,
};
