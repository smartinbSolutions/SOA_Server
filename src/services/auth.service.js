"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
// services/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const registerUser = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield Users_1.default.findOne({ email });
    if (existing)
        throw new Error("User already exists.");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield Users_1.default.create({
        email,
        password: hashedPassword,
        name,
    });
    return { id: user._id, email: user.email };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid email or password.");
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid email or password.");
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "90d",
    });
    return {
        token,
        user: { id: user._id, email: user.email, name: user.name },
    };
});
exports.loginUser = loginUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Users_1.default.find({}, "-password");
});
exports.getUsers = getUsers;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = {};
    if (data.name)
        updateData.name = data.name;
    if (data.email)
        updateData.email = data.email;
    if (data.password) {
        updateData.password = yield bcryptjs_1.default.hash(data.password, 10);
    }
    const updatedUser = yield Users_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).select("-password");
    if (!updatedUser)
        throw new Error("User not found");
    return updatedUser;
});
exports.updateUser = updateUser;
