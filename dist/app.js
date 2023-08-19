"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const event_router_1 = __importDefault(require("./routes/event.router"));
const booking_router_1 = __importDefault(require("./routes/booking.router"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Agregar para jwt
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_2.default.initialize());
passport_2.default.use(passport_1.default);
app.use("/api", user_router_1.default);
app.use("/api", event_router_1.default);
app.use("/api", booking_router_1.default);
exports.default = app;
