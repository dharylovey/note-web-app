"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
exports.verifyEmail = (0, catchErrors_1.default)(async (req, res) => {
    res.status(200).json({
        message: "Email succesfully Verified!"
    });
});
