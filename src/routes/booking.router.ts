import { Router } from "express";
import {getBookings, createBooking, updateBooking, deleteBooking } from "../controllers/booking.controller";
import passport from 'passport'

const router = Router();

router.use( passport.authenticate('jwt', { session: false }) );

router.get("/bookings", getBookings);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

export default router;