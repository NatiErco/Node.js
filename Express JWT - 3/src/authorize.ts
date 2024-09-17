import { NextFunction } from "express";
import { Request, Response } from "express";
import passport from "passport";

interface User {
    id: string;
    username: string;
   
  }
const authorize = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", {session:false}, (err: Error | null, user: User | false) =>{
if (!user || err ) {
    res.status(401).json({ message: "Unathorized" });
} else {
    req.user = user;
    next();
}
}) (req, res, next);

}

export default authorize;