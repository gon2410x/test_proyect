import { Request, Response } from "express";
import { pool } from '../db'


export const containerList = async (req: Request, res: Response) => {
    const { province, department, location, residuo } = req.body;
 
    console.log("lisa de container");

    try{

        const query = "select longitude, latitude, t.residuo from container c "+
                            "inner join location l "+
                            "inner join department d "+
                            "inner join province p "+
                            "inner join container_type t "+
                            "where c.id_location = l.id_location and l.location_name = ? and "+
                            "l.id_department = d.id_department and d.departament_name = ? and "+
                            "d.id_province = p.id_province and p.province_name = ? and "+
                            "c.id_container_type = t.id_container_type and t.residuo = ?";

        const [container] = await pool.query(query, [location, department, province, residuo]);

        const list = JSON.parse(JSON.stringify(container));
        
        return res.status(200).json(list);

    }catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
          }    
    }

};