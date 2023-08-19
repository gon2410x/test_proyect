import { Request, Response } from "express";
// import { Booking } from "../entity/Booking";
// import { Event } from "../entity/Event";

export const getBookings = async (req: Request, res: Response) => {
  
    // try {
    //     const bookings = await Booking.find({
    //         relations: ["user", "event"]

    //   });

    //   const b2 = bookings.map(  e => { 
    //     return {"id":e.id,
    //             "precio":e.precio,
    //             "fechaHora":e.fechaHora,
    //             "lugar":e.lugar,
    //             "gps":e.gps,
    //             "user":{"id":e.user.id},
    //             "event":{"id":e.event.id}
    //         } } )
      
    //   return res.json(b2);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
}


export const createBooking = async (req: Request, res: Response) => {
    // const { id_event, id_user } = req.body;

    // const booking = new Booking();
    // booking.event = id_event;
    // booking.user = id_user;
    
    // const id  = id_event;
    // const event = await Event.findOne({ 
    //     where: { id: parseInt(id) },
    // });
    
    // if (!event) return res.status(404).json({ message: "User not found" });
    
    // booking.precio = event.precio;
    // booking.fechaHora = event.fechaHora;
    // booking.lugar = event.lugar;
    // booking.gps = event.gps;


    // let t = await Booking.find({
    //     relations:{event:true}
    // });
    
    // t = t.filter(e => e.event.id == id_event);

    // if (t.length >= event.limite) return res.status(404).json({ message: "There are no more reservations" });

    // await booking.save();
    // return res.json(booking);
};


export const updateBooking = async (req: Request, res: Response) => {
  // const { id } = req.params;

  // try {
  //   const booking = await Booking.findOneBy({ id: parseInt(id) });
  //   if (!booking) return res.status(404).json({ message: "Not Booking found" });

  //   await Booking.update({ id: parseInt(id) }, req.body);

  //   return res.sendStatus(204);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }
};


export const deleteBooking = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // try {
  //   const result = await Booking.delete({ id: parseInt(id) });
  
  //   if (result.affected === 0)
  //     return res.status(404).json({ message: "Booking not found" });
  
  //   return res.sendStatus(204);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }
};