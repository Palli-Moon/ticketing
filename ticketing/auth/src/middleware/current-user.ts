import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayLoad {
  id: string;
  email: string;
}

// Modify Request to have currentUser prop
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // ? is equal to checking !req.session first
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayLoad;
  } catch (error) {
    // We want to continue whether or not we get an error
  }

  next();
};
