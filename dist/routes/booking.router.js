"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.use(passport_1.default.authenticate('jwt', { session: false }));
router.get("/bookings", booking_controller_1.getBookings);
router.post("/bookings", booking_controller_1.createBooking);
router.put("/bookings/:id", booking_controller_1.updateBooking);
router.delete("/bookings/:id", booking_controller_1.deleteBooking);
exports.default = router;
