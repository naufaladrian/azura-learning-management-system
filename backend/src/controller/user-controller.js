import userService from "../service/user-service.js";

const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const role = req.query.role || null;

        const result = await userService.getAllUsers(page, limit, role);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await userService.getUserById(userId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await userService.updateUser(userId, req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id; // From auth middleware
        const result = await userService.changePassword(userId, req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getUsersByRole = async (req, res, next) => {
    try {
        const role = req.params.role;
        const result = await userService.getUsersByRole(role);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

const getUserStatistics = async (req, res, next) => {
    try {
        const result = await userService.getUserStatistics();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
};

export {
    getAllUsers,
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    getUsersByRole,
    getUserStatistics
};
