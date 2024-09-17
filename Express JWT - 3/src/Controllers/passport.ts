import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import passportjwt from "passport-jwt";
import {db} from "../Controllers/db.js"

const { SECRET } = process.env;

if (!SECRET) {
    throw new Error("SECRET is not defined in the environment variables");
  }


passport.use(
  new passportjwt.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: any, done: (error: any, user?: any, info?: any) => void) => {
      const user = db.one(`SELECT * FROM  users WHERE id=$1`, [payload.id]);
      console.log(user);
      try {
        return user ? done(null, user) : done(new Error("User not found"));
      } catch (error) {
        done(error);
      }
    }
  )
);
