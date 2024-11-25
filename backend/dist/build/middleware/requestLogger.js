"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    try {
        console.log(req.body, req.headers, req.params, req.query);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requestLogger = requestLogger;
