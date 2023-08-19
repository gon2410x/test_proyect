import { Request, Response } from "express";
// import { Event } from "../entity/Event";

export const getEvents = async (req: Request, res: Response) => {
  
    // try {
    //   const events = await Event.find({
    //     relations: {
    //       booking: true
    //     }
    //   });
  
    //   return res.json(events);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
};


export const createEvent = async (req: Request, res: Response) => {
    // const { type, name, descripcion, lugar, fechaHora, gps, precio, limite } = req.body;

    // const user = new Event();
    // user.type = type;
    // user.name = name;
    // user.descripcion = descripcion;
    // user.lugar = lugar;
    // user.fechaHora = fechaHora;
    // user.gps = gps;
    // user.precio = precio;
    // user.limite = limite;

    // await user.save();
    // return res.json(user);
};



export const updateEvent = async (req: Request, res: Response) => {
    // const { id } = req.params;
  
    // try {
    //   const user = await Event.findOneBy({ id: parseInt(id) });
    //   if (!user) return res.status(404).json({ message: "Not event found" });
  
    //   await Event.update({ id: parseInt(id) }, req.body);
  
    //   return res.sendStatus(204);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
};



export const deleteEvent = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // try {
    //   const result = await Event.delete({ id: parseInt(id) });
  
    //   if (result.affected === 0)
    //     return res.status(404).json({ message: "Event not found" });
  
    //   return res.sendStatus(204);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
};