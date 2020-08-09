import { Router, Request, Response, NextFunction } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import { verify } from "jsonwebtoken";
import config from "../config";
import DbConnection from "../database";

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = `${req.headers["x-access-token"]}`;
    if (!token) throw "Not a authenticated user";
    let db = await DbConnection.Get();
    let isExistToken = await db.query(
      `SELECT * from tokens WHERE token="${token}"`
    );

    if (isExistToken.length === 0) throw "Session expired, login again!";

    req.body.user = {
      id: isExistToken[0].userId,
      name: isExistToken[0].name,
      email: isExistToken[0].email,
    };
    next();
  } catch (error) {
    res.status(400).send({ done: false, statusCode: 400, error });
  }
};
