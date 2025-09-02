import { prismaClient } from "../application/database.js";
import { createMessageValidation } from "../validation/message-validation.js";
import { validate } from "../validation/validation.js";

const getAllMessages = async () => {
  const messages = await prismaClient.message.findMany({
    select: {
      content: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return {
    data: messages,
  };
};

const createMessage = async (request) => {
  const message = validate(createMessageValidation, request);

  return prismaClient.message.create({
    data: {
      content: message.content,
    },
    select: {
      id: true,
      content: true,
    },
  });
};

export default { getAllMessages, createMessage };
