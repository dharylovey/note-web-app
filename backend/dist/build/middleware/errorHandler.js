"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpStatusCode_1 = require("../constant/httpStatusCode");
const zod_1 = __importDefault(require("zod"));
const handleZodError = (res, error) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message
    }));
    return res.status(httpStatusCode_1.BAD_REQUEST).json({
        errors,
        success: false,
        message: error.message
    });
};
const errorHandler = (err, req, res) => {
    console.log(`PATH ${req.path}`, err);
    if (err instanceof Error)
        res.status(httpStatusCode_1.BAD_REQUEST).json({ success: false, message: err.message });
    if (err instanceof zod_1.default.ZodError)
        handleZodError(res, err);
    res.status(httpStatusCode_1.SERVER_ERROR).json({
        success: false,
        message: "Internal server error" /* ErrorCode.InternalServerError */
    });
};
exports.errorHandler = errorHandler;
