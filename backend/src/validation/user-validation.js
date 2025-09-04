import Joi from "joi";

const registerUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("SISWA", "DOSEN", "ADMIN").default("SISWA"),
  full_name: Joi.string().max(100).optional(),
  position: Joi.string().max(100).optional(),
  nidn: Joi.string().max(20).optional(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().uuid().required();

const updateUserValidation = Joi.object({
  email: Joi.string().email().max(100).optional(),
  role: Joi.string().valid("SISWA", "DOSEN", "ADMIN").optional(),
  full_name: Joi.string().max(100).optional(),
  position: Joi.string().max(100).optional(),
  nidn: Joi.string().max(20).optional(),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().max(100).required(),
  newPassword: Joi.string().min(6).max(100).required(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  changePasswordValidation,
};
