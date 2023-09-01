import { Request, Response, NextFunction } from "express";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const token = authHeader.split(" ")[0];

    console.log(authHeader, "authHeader");
    next();
  }
};

export default authenticationMiddleware;
