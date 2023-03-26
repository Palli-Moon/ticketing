"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    // ? is equal to checking !req.session first
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    try {
        req.currentUser = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
    }
    catch (error) {
        // We want to continue whether or not we get an error
    }
    next();
};
exports.currentUser = currentUser;
