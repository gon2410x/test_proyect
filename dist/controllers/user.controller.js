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
exports.refresh = exports.signIn = exports.signUp = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const User_1 = require("../entity/User");
// -------- Agregar para jwt
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = 'somesecrettoken';
const jwtRefreshTokenSecret = 'somesecrettokenrefresh';
let refreshTokens = [];
const createToken = (user) => {
    // Se crean el jwt y refresh token
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '300s' });
    const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, jwtRefreshTokenSecret, { expiresIn: '90d' });
    refreshTokens.push(refreshToken);
    return {
        token,
        refreshToken
    };
};
// --------
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            relations: {
                booking: true
            }
        });
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOne({
            where: { id: parseInt(id) },
            relations: ['booking']
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.User.findOneBy({ id: parseInt(id) });
        if (!user)
            return res.status(404).json({ message: "Not user found" });
        yield User_1.User.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield User_1.User.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "User not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
// --------- Agregar para jwt
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Please. Send your email and password" });
    }
    const user = yield User_1.User.findOneBy({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "The User already Exists" });
    }
    const newUser = new User_1.User();
    newUser.email = req.body.email;
    newUser.password = yield createHash(req.body.password);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Please. Send your email and password" });
    }
    const user = yield User_1.User.findOneBy({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: "The User does not exists" });
    }
    const isMatch = yield comparePassword(user, req.body.password);
    if (isMatch) {
        return res.status(400).json({ credentials: createToken(user) });
    }
    return res.status(400).json({
        msg: "The email or password are incorrect"
    });
});
exports.signIn = signIn;
const comparePassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, user.password);
});
const createHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
// Create new access token from refresh token
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const refreshToken = req.header("x-auth-token");
    const refreshToken = req.body.refresh;
    // If token is not provided, send error message
    if (!refreshToken) {
        res.status(401).json({
            errors: [
                {
                    msg: "Token not found",
                },
            ],
        });
    }
    //console.log(refreshTokens);
    // If token does not exist, send error message
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json({
            errors: [
                {
                    msg: "Invalid refresh token",
                },
            ],
        });
    }
    try {
        const user = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshTokenSecret);
        // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
        const { email } = user;
        const userFound = yield User_1.User.findOneBy({ email: email });
        if (!userFound) {
            return res.status(400).json({ msg: "The User does not exists" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: userFound.id, email: userFound.email }, jwtSecret, { expiresIn: '120s' });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(403).json({
            errors: [
                {
                    msg: "Invalid token",
                },
            ],
        });
    }
});
exports.refresh = refresh;
