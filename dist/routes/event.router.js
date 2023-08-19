"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/events", event_controller_1.getEvents);
router.post("/events", passport_1.default.authenticate('jwt', { session: false }), event_controller_1.createEvent);
router.put("/events/:id", passport_1.default.authenticate('jwt', { session: false }), event_controller_1.updateEvent);
router.delete("/events/:id", passport_1.default.authenticate('jwt', { session: false }), event_controller_1.deleteEvent);
exports.default = router;
