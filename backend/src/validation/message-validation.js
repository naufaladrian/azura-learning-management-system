import Joi from "joi";

const getMessageByIdValidation = Joi.object({
  id: Joi.string().required(),
});

const createMessageValidation = Joi.object({
  content: Joi.string().required(),
});

export { getMessageByIdValidation, createMessageValidation };
