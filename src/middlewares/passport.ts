// import { User } from "../entity/User";
import { pool } from '../db'
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";


const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'somesecrettoken'
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await pool.query('SELECT * FROM User WHERE id_user = ?',[payload.id] );
    
    if (user) {
      return done(null, user);
    }
    return done(null, false);
    
  } catch (error) {
    console.log(error);
  }
});