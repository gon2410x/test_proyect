import { Request, Response } from "express";
// import { User } from "../entity/User";

// -------- Agregar para jwt
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSecret = 'somesecrettoken';
const jwtRefreshTokenSecret = 'somesecrettokenrefresh';
let refreshTokens: (string | undefined)[] = [];

// import { pool } from 
import { pool } from '../db'
import { use } from "passport";


const createToken = (user: any) => {
  //Se crean el jwt y refresh token
  const token = jwt.sign({ id: user.id_user, email: user.email }, jwtSecret, {expiresIn: '60s'});
  const refreshToken = jwt.sign({ email: user.email }, jwtRefreshTokenSecret, {expiresIn: '90d'});
  
  refreshTokens.push(refreshToken);
  return {
      token,
      refreshToken
  }
}
// --------

export const getUsers = async (req: Request, res: Response) => {
  
  try {
    // const [user_list] = await pool.query("select * from User");
    const [user_list] = await pool.query("SELECT u.id_user, u.user, u.email, u.password, r.rol FROM User u INNER JOIN Rol r on u.id_rol = r.id_rol");
    return res.status(200).json(user_list);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      //const [user] = await pool.query('select * from client WHERE id_user = ?',[id] );
      const [user] = await pool.query('SELECT u.id_user, u.user, u.email, r.rol FROM User u inner join rol r on u.id_rol=r.id_rol WHERE id_user = ?',[id] );

      // if (Array.isArray(user) && user.length === 0) {
      //   return res.status(404).json({ message: "User not found" });
      // }
     // https://stackoverflow.com/questions/55530602/property-length-does-not-exists-on-type-okpacket-in-mysql2-module
     // https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object

      const aux = JSON.parse(JSON.stringify(user));

      if (!aux[0]) return res.status(404).json({ message: "User not found" });
      
      return res.json(aux[0]); 

    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };


  export const updateUser = async (req: Request, res: Response) => {
    // const { id } = req.params;
  
    // try {
    //   const user = await User.findOneBy({ id: parseInt(id) });
    //   if (!user) return res.status(404).json({ message: "Not user found" });
  
    //   await User.update({ id: parseInt(id) }, req.body);
  
    //   return res.sendStatus(204);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // try {
    //   const result = await User.delete({ id: parseInt(id) });
  
    //   if (result.affected === 0)
    //     return res.status(404).json({ message: "User not found" });
  
    //   return res.sendStatus(204);
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return res.status(500).json({ message: error.message });
    //   }
    // }
  };

  
  // --------- Agregar para jwt

  export const signUp = async (req: Request, res: Response ): Promise<Response> => {
    const { user, email, password } = req.body;
    
    if (!email || !password || !user) {
      return res
      .status(400)
      .json({ msg: "Please. Send your user name, email and password" });
    }
    const [rows] = await pool.query('SELECT * FROM User WHERE user = ? OR email = ?',[user, email]);
    
    const new_user = JSON.parse(JSON.stringify(rows));
    
    if (new_user[0]) {
      return res.status(400).json({ msg: "The User o gmail already Exists" });
    }

    const secret_password = await createHash(password);
    pool.query('INSERT INTO User (user, password, email, id_rol) VALUES (?, ?, ?, ?)',[user, secret_password, email,2]);

    return res.status(200).json("el usuario fue registrado exitosamente");
  };



  export const signIn = async (req: Request, res: Response): Promise<Response> => {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }

    const query = "SELECT * FROM User u "+
                    "inner join Rol r "+
                    "WHERE u.id_rol = r.id_rol AND "+
                    "u.email = ?"; 

    const [rows] = await pool.query(query, [email]);

    const user = JSON.parse(JSON.stringify(rows));
    
    if (!user[0]) {
      return res.status(400).json({ msg: "The email does not exists" });
    }

    const isMatch = await comparePassword(user[0].password, password);
  
    if (isMatch) {
      return res.status(400).json({ credentials: createToken(user[0]), rol: user[0].rol });
    }
  
    return res.status(400).json({
      msg: "The email or password are incorrect"
    });
  };


  const comparePassword = async (c: string, password: string ): Promise<Boolean> => {
    return await bcrypt.compare(password, c);
  };


  const createHash = async (password: string ): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };



// Create new access token from refresh token
// export const refresh = async (req: Request, res: Response): Promise<any>  => {
//   // const refreshToken = req.header("x-auth-token");

//   const refreshToken = req.body.refresh;


//   // If token is not provided, send error message
//   if (!refreshToken) {
//     res.status(401).json({
//       errors: [
//         {
//           msg: "Token not found",
//         },
//       ],
//     });
//   }

//   //console.log(refreshTokens);
//   // If token does not exist, send error message
//   if (!refreshTokens.includes(refreshToken)) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid refresh token",
//         },
//       ],
//     });
//   }


//   try {
//     const user = jwt.verify(refreshToken, jwtRefreshTokenSecret);
//     // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
//     const { email } = <any>user;

//     const userFound = <User> await User.findOneBy({ email: email });
//     if (!userFound) {
//       return res.status(400).json({ msg: "The User does not exists" });
//     }

//     const accessToken = jwt.sign({ id: userFound.id, email: userFound.email }, jwtSecret, {expiresIn: '120s'});

//     res.json({ accessToken });
//   } catch (error) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid token",
//         },
//       ],
//     });
//   }
// };