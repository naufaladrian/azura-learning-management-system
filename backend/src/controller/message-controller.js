import messageService from "../service/message-service.js";

const createMessage = async (req, res, next) => {
  try {
    const result = await messageService.createMessage(req.body);
    res.status(201).json({
      message: "Message created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const result = await messageService.getAllMessages();
    res.status(200).json({
      message: "Messages retrieved successfully",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export default { createMessage, getAllMessages };
