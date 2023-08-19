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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookings = void 0;
const Booking_1 = require("../entity/Booking");
const Event_1 = require("../entity/Event");
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.Booking.find({
            relations: ["user", "event"]
        });
        const b2 = bookings.map(e => {
            return { "id": e.id,
                "precio": e.precio,
                "fechaHora": e.fechaHora,
                "lugar": e.lugar,
                "gps": e.gps,
                "user": { "id": e.user.id },
                "event": { "id": e.event.id }
            };
        });
        return res.json(b2);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getBookings = getBookings;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_event, id_user } = req.body;
    const booking = new Booking_1.Booking();
    booking.event = id_event;
    booking.user = id_user;
    const id = id_event;
    const event = yield Event_1.Event.findOne({
        where: { id: parseInt(id) },
    });
    if (!event)
        return res.status(404).json({ message: "User not found" });
    booking.precio = event.precio;
    booking.fechaHora = event.fechaHora;
    booking.lugar = event.lugar;
    booking.gps = event.gps;
    let t = yield Booking_1.Booking.find({
        relations: { event: true }
    });
    t = t.filter(e => e.event.id == id_event);
    if (t.length >= event.limite)
        return res.status(404).json({ message: "There are no more reservations" });
    yield booking.save();
    return res.json(booking);
});
exports.createBooking = createBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const booking = yield Booking_1.Booking.findOneBy({ id: parseInt(id) });
        if (!booking)
            return res.status(404).json({ message: "Not Booking found" });
        yield Booking_1.Booking.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Booking_1.Booking.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Booking not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteBooking = deleteBooking;
