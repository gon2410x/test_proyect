import { Router } from "express";
import {getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller'
import passport from 'passport'

const router = Router();

router.get("/events", getEvents);
router.post("/events", passport.authenticate('jwt', { session: false }), createEvent);
router.put("/events/:id", passport.authenticate('jwt', { session: false }), updateEvent);
router.delete("/events/:id", passport.authenticate('jwt', { session: false }), deleteEvent);

export default router;